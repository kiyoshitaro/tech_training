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
using OfficeDevPnP.Core.Pages;

namespace PnPSitesCoreDemo
{
    class Program
    {
        private static Dictionary<string, CanvasSectionTemplate> SectionTypeMapping = new Dictionary<string, CanvasSectionTemplate>() {
             { "OneColumn", CanvasSectionTemplate.OneColumn },
            { "TwoColumnLeft", CanvasSectionTemplate.TwoColumnLeft }

        };


        private static void DeployPage(DeployPage PageConfig, ClientContext context)
        {
            try
            {

                //LOGO 
                var web = context.Web;
                //context.Load(web, p => p.Title);
                string SiteLogoUrl = PageConfig.LogoUrl;
                web.SiteLogoUrl = SiteLogoUrl;
                web.Update();
                context.ExecuteQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }


            //PAGE
            string PageName = PageConfig.Name;
            ClientSidePage Page = null;
            try
            {
                Page = ClientSidePage.Load(context, PageName);
                Console.WriteLine($"{PageName} existed, we are going to edit it");

                Page.Publish();
                Page.ClearPage();
                Page.Save();
                Page.Publish();
            }
            catch
            {
                Console.WriteLine($"Created new page {PageName}");
                Page = new ClientSidePage(context, ClientSidePageLayoutType.Home);
            }



            //SECTION
            var SectionConfig = PageConfig.Sections;

                if (SectionConfig.Count > 0)
                {
                    for (int i = 0; i < SectionConfig.Count; i++)
                    {
                        Console.WriteLine($"-----Creating section {i+1}-----");
                        Console.WriteLine($"--------------------------------");

                        string SectionType = SectionConfig[i].SectionType;
                        CanvasSection Section = new CanvasSection(Page, SectionTypeMapping[SectionType], 0);
                        Page.AddSection(Section);


                        //WEBPARTS
                        string Name = "";
                        string ListName = "";
                        int PostPerPage = 4;
                        int Column = 0;

                        var WebpartConfig = SectionConfig[i].WebParts;

                        if (WebpartConfig.Count > 0)
                        {
                            for (int j = 0; j < WebpartConfig.Count; j++)
                            {
                                try
                                {
                                    Name = WebpartConfig[j].Name;
                                    ListName = WebpartConfig[j].ListName;
                                    PostPerPage = WebpartConfig[j].PostPerPage;
                                    Column = WebpartConfig[j].Column;
                                }
                                catch (Exception e)
                                {
                                    Console.WriteLine(e.Message);
                                }
                                Console.WriteLine($"-----Creating {Name} webpart-----");
                                var Webpart = Page.AvailableClientSideComponents(Name).ToList();
                                string PropertiesJson = "";

                                ClientSideWebPart ClientWP = null;
                                try
                                {
                                    ClientWP = new ClientSideWebPart(Webpart.First());
                                }
                                catch (Exception e)
                                {
                                    Console.WriteLine(e.Message);
                                }

                                switch (Name)
                                {
                                    case "announcement":
                                        PropertiesJson = "{\"listName\": \"" + ListName + "\"," +
                                                            "\"postPerPage\": \"" + PostPerPage + "\"}";
                                        break;
                                    case "news":
                                        PropertiesJson = "{\"listName\": \"" + ListName + "\"," +
                                                            "\"postPerPage\": \"" + PostPerPage + "\"}";
                                        //Console.WriteLine($"-----cccccccc-----{PropertiesJson}");
                                        break;
                                    default:
                                        break;
                                }
                                ClientWP.PropertiesJson = PropertiesJson;
                                Page.AddControl(ClientWP, Section.Columns[Column]);

                                Console.WriteLine($"-----Created {Name} webpart-----");
                                Console.WriteLine($"--------------------------------");

                            }
                        }
                        else {
                            Console.WriteLine($"No webpart to create");
                        }
                        Console.WriteLine($"-----Created section {i+1}-----");
                        Console.WriteLine($"--------------------------------");

                    }
                    Page.Save();
                    Page.Publish();
                    Console.WriteLine($"-----Save and Publish page-----");

                }
                else {
                    Console.WriteLine($"No section to create");
                }
        }

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
            Elements Configuration = XmlUtility.ToObject<Elements>(constConfig.InnerXml);
           
            var PageConfigXml = new XmlDocument();
            PageConfigXml.Load(@"Configuration\PageConfig.xml");
            Console.WriteLine(PageConfigXml.InnerXml);
            DeployPage PageConfig = XmlUtility.ToObject<DeployPage>(PageConfigXml.InnerXml);




            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();

            DeployPage(PageConfig, context);

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

                    Console.WriteLine("sssss");
                    //System.Environment.Exit(0);

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
