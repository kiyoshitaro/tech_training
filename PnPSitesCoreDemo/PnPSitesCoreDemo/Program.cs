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
using SP = Microsoft.SharePoint.Client;
using System.IO;

namespace PnPSitesCoreDemo
{
    class Program
    {
        private static Dictionary<string, CanvasSectionTemplate> SectionTypeMapping = new Dictionary<string, CanvasSectionTemplate>() {
             { "OneColumn", CanvasSectionTemplate.OneColumn },
            { "TwoColumnLeft", CanvasSectionTemplate.TwoColumnLeft }

        };

        private static string UploadImage( string value, ClientContext context)
        {
            string[] Path = value.Split('\\');
            string fileName = Path[Path.Length - 1];
            Console.WriteLine($"{fileName}");

            Folder folder = context.Web.GetFolderByServerRelativeUrl("SiteAssets");
            context.Load(folder);
            context.ExecuteQuery();

            string fileUrl = string.Format("{0}/{1}", folder.ServerRelativeUrl, fileName);

            using (FileStream fsWrite = new FileStream(value, FileMode.OpenOrCreate, FileAccess.ReadWrite, FileShare.ReadWrite))
            {
                try {
                    Microsoft.SharePoint.Client.File uploadFile = folder.Files.Add(new FileCreationInformation()
                    {
                        ContentStream = fsWrite,
                        Url = fileUrl,
                        Overwrite = true
                    });
                    context.ExecuteQuery();
                    context.Load(uploadFile);
                    context.ExecuteQuery();

                    string val = string.Format("{{\"type\":\"thumbnail\"," +
                        "\"fileName\":\"{0}\"," +
                        "\"nativeFile\":{{}}," +
                        "\"fieldName\":\"Image\"," +
                        "\"serverUrl\":\"https://vndevcore.sharepoint.com\"," +
                        "\"serverRelativeUrl\":\"{1}\"," +
                        "\"id\":\"{2}\"}}", fileName, uploadFile.ServerRelativeUrl, uploadFile.UniqueId);


                    return val;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return "";
                }
            }
        }

        private static void DeployItem(DeployItem ItemConfiguration, ClientContext context) {
            Console.WriteLine($"-----Deploying Item-----");

            //LIST
            List<ListItems> ListItemsConfig = ItemConfiguration.ListItems;
            for (int i = 0; i < ListItemsConfig.Count; i++)
            {
                ListItems ListItemConfig = ListItemsConfig[i];
                string ListTitleConfig = ListItemConfig.Title;
                Console.WriteLine($"-----Adding item in {ListTitleConfig} list-----");


                if (!context.Web.ListExists(ListTitleConfig))
                {
                    Console.WriteLine($"------{ListTitleConfig} not exist------");
                    break;
                }

                //DELETE ALL ITEM IN EXIST LIST
                else
                {
                    SP.List oList = context.Web.Lists.GetByTitle(ListTitleConfig);
                    CamlQuery camlQuery = new CamlQuery();
                    camlQuery.ViewXml = "<View><Query><Where><Geq><FieldRef Name='ID'/>" +
                        "<Value Type='Number'>10</Value></Geq></Where></Query><RowLimit>100</RowLimit></View>";
                    ListItemCollection collListItem = oList.GetItems(camlQuery);

                    context.Load(collListItem);
                    context.ExecuteQuery();
                    int Count = 0;
                    while (collListItem.Count > 0) {
                        Count += 1;
                        collListItem[0].DeleteObject();
                        context.Load(collListItem);
                    }
                    context.ExecuteQuery();
                    Console.WriteLine($"------Deleted all {Count} items in {ListTitleConfig} list------");
                }


                //ITEM
                List<Item> ItemsConfig = ListItemConfig.Items;
                if (ItemsConfig.Count > 0)
                {
                    for (int j = 0; j < ItemsConfig.Count; j++) {


                        //GET LIST

                        SP.List oList = context.Web.Lists.GetByTitle(ListTitleConfig);
                        ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                        ListItem oListItem = oList.AddItem(itemCreateInfo);


                        Item ItemConfig = ItemsConfig[j];
                        //FIELD
                        List<ItemField> ItemFieldsConfig = ItemConfig.ItemFields;
                        foreach (ItemField ItemFieldConfig in ItemFieldsConfig)
                        {
                            string KeyConfig = ItemFieldConfig.Key;
                            string ValueConfig = ItemFieldConfig.Value;

                            try
                            {
                                switch (KeyConfig)
                                {
                                    case "img":
                                    case "icon":
                                        oListItem[KeyConfig] = UploadImage(ValueConfig,context);
                                        break;
                                    case "time":
                                        try
                                        {
                                            oListItem[KeyConfig] = Convert.ToDateTime(ValueConfig);

                                        }
                                        catch
                                        {
                                            Console.WriteLine($"'{ValueConfig}' is not in the proper format.");
                                            oListItem[KeyConfig] = Convert.ToDateTime(String.Empty);

                                        }
                                        break;
                                    case "tags":
                                        Console.WriteLine(ValueConfig.Split(',').ToList().Count);
                                        oListItem[KeyConfig] = ValueConfig.Split(',').ToList();
                                        break;

                                    default:
                                        oListItem[KeyConfig] = ValueConfig;
                                        break;
                                }
                                oListItem.Update();
                                context.ExecuteQuery();

                                Console.WriteLine($"------Added {KeyConfig}, {j}/{ItemsConfig.Count}");

                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Exception:{ex.Message}  when add item with key {KeyConfig} in {ListTitleConfig}");
                            }
                        }
                    }


                    Console.WriteLine($"------Added {ItemsConfig.Count} items in {ListTitleConfig} list------");
                }
                else {
                    Console.WriteLine($"------ No item to create in {ListTitleConfig} list------");
                }
            }
        }
        private static void DeployList(DeployList ListConfiguration, ClientContext context)
        {
            Web oWebsite = context.Web;

            List<DList> ListsConfig = ListConfiguration.Lists;
            for (int i = 0; i < ListsConfig.Count; i++)
            {
                DList ListConfig = ListsConfig[i];

                string ListTitleConfig = ListConfig.Title;

                //DELETE LIST
                List ListObject;
                if (oWebsite.ListExists(ListTitleConfig))
                {
                    Console.WriteLine($"------{ListTitleConfig} existed, deleting------");
                    try
                    {
                        ListObject = oWebsite.Lists.GetByTitle(ListTitleConfig);
                        ListObject.DeleteObject();
                        context.ExecuteQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Exception {ex.Message} when deleting{ListTitleConfig}");
                    }
                }

                //CREATE LIST
                Console.WriteLine($"--------Creating {ListTitleConfig} list--------");
                try
                {
                    ListCreationInformation listCreationInfo = new ListCreationInformation();
                    listCreationInfo.Title = ListTitleConfig;
                    listCreationInfo.TemplateType = (int)ListTemplateType.GenericList;
                    context.Web.Lists.Add(listCreationInfo);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception {ex.Message} when creating {ListTitleConfig} list");
                }

                //ADD FIELD
                ListObject = oWebsite.Lists.GetByTitle(ListTitleConfig);
                List<DField> FieldsConfig = ListConfig.Fields;

                for (int j = 0; j < FieldsConfig.Count; j++)
                {
                    DField FieldConfig = FieldsConfig[j];

                    string FieldNameConfig = "";
                    string FieldTypeConfig = "";
                    string FieldIsRequiredConfig = "";
                    string FieldFormatConfig = "";
                    List<DChoice> ChoicesConfig = null;

                    try
                    {
                        FieldNameConfig = FieldConfig.Name;
                        FieldTypeConfig = FieldConfig.Type;
                        FieldIsRequiredConfig = FieldConfig.IsRequired;
                        FieldFormatConfig = FieldConfig.Format;
                        ChoicesConfig = FieldConfig.Choices;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }

                    try
                    {

                        string xml = "";
                        if (ChoicesConfig != null && ChoicesConfig.Count > 0)
                        {
                            xml = $"<Field DisplayName='{FieldNameConfig}' Type='{FieldTypeConfig}' Name='{FieldNameConfig}' Required='{FieldIsRequiredConfig}'><CHOICES>";
                            foreach (DChoice Choice in ChoicesConfig)
                            {
                                Console.WriteLine(Choice.Value);
                                xml += $"<CHOICE>{Choice.Value}</CHOICE>";
                            }
                            xml += $"</CHOICES></Field>";
                        }
                        else
                        {
                            xml = $"<Field DisplayName='{FieldNameConfig}' Type='{FieldTypeConfig}' Name='{FieldNameConfig}' Required='{FieldIsRequiredConfig}' Format='{FieldFormatConfig}'/>";
                        }
                        Console.WriteLine(xml);

                        ListObject.Fields.AddFieldAsXml(xml, true, AddFieldOptions.DefaultValue);
                        context.ExecuteQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Exception {ex.Message} when creating {FieldConfig.Name} field in {ListTitleConfig} list");
                    }
                }
                Console.WriteLine($"------Created {ListTitleConfig}--------");
            }


            //CREATE LIST
            //ListCreationInformation listCreationInfo = new ListCreationInformation();
            //listCreationInfo.Title = "Announcement2";
            //listCreationInfo.TemplateType = (int)ListTemplateType.GenericList;
            //List oList = oWebsite.Lists.Add(listCreationInfo);


            //ADD FIELD
            //SP.List oList = oWebsite.Lists.GetByTitle("Announcement2");

            //SP.Field oField = oList.Fields.AddFieldAsXml("<Field DisplayName='MyField' Type='Number' />",
            //    true, AddFieldOptions.DefaultValue);

            //SP.FieldNumber fieldNumber = context.CastTo<FieldNumber>(oField);
            //fieldNumber.MaximumValue = 100;
            //fieldNumber.MinimumValue = 35;

            //fieldNumber.Update();


            //DELETE LIST
            //List oList = oWebsite.Lists.GetByTitle("Announcement2");
            //oList.DeleteObject();


            //READ ITEM
            //List oList = oWebsite.Lists.GetByTitle("Announcement2");
            //CamlQuery camlQuery = new CamlQuery();
            //camlQuery.ViewXml = "<View><Query><Where><Geq><FieldRef Name='ID'/>" +
            //    "<Value Type='Number'>10</Value></Geq></Where></Query><RowLimit>100</RowLimit></View>";
            //ListItemCollection collListItem = oList.GetItems(camlQuery);
            //context.Load(collListItem);

            //CREATE ITEM
            //SP.List oList = oWebsite.Lists.GetByTitle("Announcement1");
            //ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            //ListItem oListItem = oList.AddItem(itemCreateInfo);
            //oListItem["Title"] = "My New Item!";
            //oListItem["content"] = "Hello World!";
            //oListItem.Update();
            //context.ExecuteQuery();


        }


            private static void DeployPage(DeployPage PageConfig, ClientContext context)
        {
            Console.WriteLine($"-----Connecting-----");

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
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message} when making logo");
            }


            //PAGE
            string PageNameConfig = PageConfig.Name;
            ClientSidePage PageObject = null;
            try
            {
                PageObject = ClientSidePage.Load(context, PageNameConfig);
                Console.WriteLine($"{PageNameConfig} existed, we are going to edit it");

                PageObject.Publish();
                PageObject.ClearPage();
                PageObject.Save();
                PageObject.Publish();

                //SECTION
                var SectionConfig = PageConfig.Sections;

                if (SectionConfig.Count > 0)
                {
                    for (int i = 0; i < SectionConfig.Count; i++)
                    {
                        Console.WriteLine($"-----Creating section {i+1}-----");
                        Console.WriteLine($"--------------------------------");

                        string SectionTypeConfig = SectionConfig[i].SectionType;
                        CanvasSection Section = new CanvasSection(PageObject, SectionTypeMapping[SectionTypeConfig], 0);
                        PageObject.AddSection(Section);


                        //WEBPARTS
                        var WebpartConfig = SectionConfig[i].WebParts;

                        string WebpartNameConfig = "";
                        string WebpartListNameConfig = "";
                        int WebpartPostPerPageConfig = 4;
                        int WebpartColumnConfig = 0;


                        if (WebpartConfig.Count > 0)
                        {
                            for (int j = 0; j < WebpartConfig.Count; j++)
                            {
                                try
                                {
                                    WebpartNameConfig = WebpartConfig[j].Name;
                                    WebpartListNameConfig = WebpartConfig[j].ListName;
                                    WebpartPostPerPageConfig = WebpartConfig[j].PostPerPage;
                                    WebpartColumnConfig = WebpartConfig[j].Column;
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine(ex.Message);
                                }

                                Console.WriteLine($"-----Creating {WebpartNameConfig} webpart-----");
                                try
                                {
                                    var Webpart = PageObject.AvailableClientSideComponents(WebpartNameConfig).ToList();
                                    string PropertiesJson = "";

                                    ClientSideWebPart WebpartObject = null;
                                    try
                                    {
                                        WebpartObject = new ClientSideWebPart(Webpart.First());
                                    }
                                    catch (Exception ex)
                                    {
                                        Console.WriteLine(ex.Message);
                                    }

                                    switch (WebpartNameConfig)
                                    {
                                        case "announcement":
                                            PropertiesJson = "{\"listName\": \"" + WebpartListNameConfig + "\"," +
                                                                "\"postPerPage\": \"" + WebpartPostPerPageConfig + "\"}";
                                            break;
                                        case "news":
                                            PropertiesJson = "{\"listName\": \"" + WebpartListNameConfig + "\"," +
                                                                "\"postPerPage\": \"" + WebpartPostPerPageConfig + "\"}";
                                            //Console.WriteLine($"-----cccccccc-----{PropertiesJson}");
                                            break;
                                        default:
                                            break;
                                    }
                                    WebpartObject.PropertiesJson = PropertiesJson;
                                    PageObject.AddControl(WebpartObject, Section.Columns[WebpartColumnConfig]);

                                    Console.WriteLine($"-----Created {WebpartNameConfig} webpart-----");
                                    Console.WriteLine($"--------------------------------");
                                }
                                catch (Exception ex) {
                                    Console.WriteLine(ex.Message);
                                }
                            }
                        }
                        else {
                            Console.WriteLine($"No webpart to create");
                        }
                        Console.WriteLine($"-----Created section {i+1}-----");
                        Console.WriteLine($"--------------------------------");

                    }
                    PageObject.Save();
                    PageObject.Publish();
                    Console.WriteLine($"-----Save and Publish page-----");

                }
                else {
                    Console.WriteLine($"No section to create");
                }

            }
            catch
            {

                PageObject = new ClientSidePage(context, ClientSidePageLayoutType.Home);
                Console.WriteLine($"----- Created new page {PageNameConfig}, run again ------");

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
            DeployPage PageConfig = XmlUtility.ToObject<DeployPage>(PageConfigXml.InnerXml);

            var ListConfigXml = new XmlDocument();
            ListConfigXml.Load(@"Configuration\ListConfig.xml");
            DeployList ListConfig = XmlUtility.ToObject<DeployList>(ListConfigXml.InnerXml);

            var ItemConfigXml = new XmlDocument();
            ItemConfigXml.Load(@"Configuration\ItemConfig.xml");
            DeployItem ItemConfig = XmlUtility.ToObject<DeployItem>(ItemConfigXml.InnerXml);


            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();

            //DeployPage(PageConfig, context);
            DeployList(ListConfig, context);
            DeployItem(ItemConfig, context);

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
            catch (Exception ex)
            {
                sStrPwd = null;
                Console.WriteLine(ex.Message);
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
