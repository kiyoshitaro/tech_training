using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Threading;
using PnPSitesCoreDemo.Modules;
using System.Reflection;
using PnPSitesCoreDemo.Utility;
using System.Diagnostics;

namespace PnPSitesCoreDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            var siteUrl = ConfigurationManager.AppSettings["siteUrl"];
            var username = ConfigurationManager.AppSettings["accountName"];
            Console.WriteLine($"SharePoint Online User Name: {username}");
            Console.WriteLine("Please input user Password: ");
            var password = GetPassword();
            ClientContext context = new ClientContext(siteUrl);
            context.Credentials = new SharePointOnlineCredentials(username, password);
            var constConfig = new XmlDocument();
            constConfig.Load(@"Configuration\Configuration.xml");
            Elements configrations = XmlUtility.ToObject<Elements>(constConfig.InnerXml);
            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            Deploy(configrations.DeployElements, context);
            stopwatch.Stop();
            Console.WriteLine(string.Format("Home site deployment takes: {0} s", stopwatch.ElapsedTicks / 10000000));
            Console.ReadLine();
        }

        static SecureString GetPassword()
        {
            SecureString sStrPwd = new SecureString();
            try
            {
                Console.Write("SharePoint Password : ");

                for (ConsoleKeyInfo keyInfo = Console.ReadKey(true); keyInfo.Key != ConsoleKey.Enter; keyInfo = Console.ReadKey(true))
                {
                    if (keyInfo.Key == ConsoleKey.Backspace)
                    {
                        if (sStrPwd.Length > 0)
                        {
                            sStrPwd.RemoveAt(sStrPwd.Length - 1);
                            Console.SetCursorPosition(Console.CursorLeft - 1, Console.CursorTop);
                            Console.Write(" ");
                            Console.SetCursorPosition(Console.CursorLeft - 1, Console.CursorTop);
                        }
                    }
                    else if (keyInfo.Key != ConsoleKey.Enter)
                    {
                        Console.Write("*");
                        sStrPwd.AppendChar(keyInfo.KeyChar);
                    }

                }
                Console.WriteLine("");
            }
            catch (Exception e)
            {
                sStrPwd = null;
                Console.WriteLine(e.Message);
            }

            return sStrPwd;
        }

        private static void Deploy(IElements configrationElemetns, ClientContext context)
        {
            try
            {
                using (context)
                {
                    Type xmlType = configrationElemetns.GetType();
                    foreach (PropertyInfo property in xmlType.GetProperties())
                    {
                        if (property.PropertyType.GetInterface("IDeployModule") != null)
                        {
                            MethodInfo mi = property.PropertyType.GetMethod("Deploy");
                            if (mi != null && property.GetValue(configrationElemetns) != null)
                            {
                                mi.Invoke(property.GetValue(configrationElemetns), new object[] { context });
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
