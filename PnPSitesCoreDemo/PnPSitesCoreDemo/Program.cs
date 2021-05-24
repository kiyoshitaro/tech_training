using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using System.Text;
using System.Xml;
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
            //Console.WriteLine($"{fileName}");

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

        private static void DeployItem(DeployItem ItemConfiguration, ClientContext context, string rootAsset) {
            Console.WriteLine($"-----------------------------------------------");
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
                    Console.WriteLine($"------{ListTitleConfig} not exist, must create list first------");
                    break;
                }

                //DELETE ALL ITEM IN EXISTED LIST
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
                    Console.WriteLine($"--------------");

                    //System.Environment.Exit(0);

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
                                        oListItem[KeyConfig] = UploadImage(Path.Combine(rootAsset,ValueConfig), context);
                                        break;
                                    case "time":
                                    case "EndDate":
                                    case "EventDate":
                                        try
                                        {
                                            oListItem[KeyConfig] = Convert.ToDateTime(ValueConfig).ToString("yyyy-MM-ddTHH\\:mm\\:ssZ");
                                        }
                                        catch
                                        {
                                            Console.WriteLine($"'{ValueConfig}' is not in the proper format.");
                                            oListItem[KeyConfig] = Convert.ToDateTime(String.Empty);
                                        }
                                        break;
                                    case "tags":
                                        //Console.WriteLine(ValueConfig.Split(',').ToList().Count);
                                        oListItem[KeyConfig] = ValueConfig.Split(',').ToList();
                                        break;

                                    default:
                                        oListItem[KeyConfig] = ValueConfig;
                                        oListItem.Update();
                                        break;
                                }


                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Exception:{ex.Message}  when add item with key {KeyConfig} in {ListTitleConfig}");
                            }

                        }
                        oListItem.Update();
                        context.ExecuteQuery();

                        Console.WriteLine($"------Added {j+1}/{ItemsConfig.Count} items");

                    }
                    Console.WriteLine($"------Added all {ItemsConfig.Count} items in {ListTitleConfig} list------");
                    Console.WriteLine($"--------------");
                }
                else {
                    Console.WriteLine($"------ No item to create in {ListTitleConfig} list------");
                }
            }
            Console.WriteLine($"-----------------------------------------------");
        }

        private static void CreateItemInFolder(DFolder FolderConfig, List LibObject, ClientContext context, string PrevFolderTitleConfig, string rootAsset)
        {
            string FolderTitleConfig = FolderConfig.Title;
            try
            {
                ListItemCreationInformation FolderObject = new ListItemCreationInformation();
                FolderObject.UnderlyingObjectType = FileSystemObjectType.Folder;

                //context.Load(LibObject.RootFolder);
                //context.ExecuteQuery();
                //FolderObject.FolderUrl = LibObject.RootFolder.ServerRelativeUrl + "/" + PrevFolderTitleConfig;
                FolderObject.LeafName = FolderTitleConfig;

                ListItem newItem = LibObject.AddItem(FolderObject);
                newItem["Title"] = FolderTitleConfig;
                newItem.Update();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception {ex.Message} when creating {FolderTitleConfig} folder in {PrevFolderTitleConfig}");

            }
            List<DFile> FilesConfig = FolderConfig.Files;
            for (int k = 0; k < FilesConfig.Count; k++)
            {
                try
                {
                    DFile FileConfig = FilesConfig[k];

                    FileCreationInformation FileObject = new FileCreationInformation();

                    string FilePath = Path.Combine(rootAsset, FileConfig.Path);
                    FileObject.Content = System.IO.File.ReadAllBytes(@FilePath);

                    string[] filePath = FilePath.Split('\\');
                    string fileName = filePath[filePath.Length - 1];
                    FileObject.Url = @fileName;

                    Folder fo = LibObject.RootFolder.Folders.GetByUrl(FolderTitleConfig);
                    var uploadFile = fo.Files.Add(FileObject);

                    context.Load(LibObject);
                    context.Load(uploadFile);
                    context.ExecuteQuery();
                    Console.WriteLine($"-------Uploaded {fileName} in folder {FolderTitleConfig}--------");

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception {ex.Message} when pushing {FolderTitleConfig}");
                }
            }

            List<DFolder> FolsConfig = FolderConfig.Folders;
            foreach (DFolder FolConfig in FolsConfig)
            {
                CreateItemInFolder(FolConfig, LibObject, context, FolderTitleConfig, rootAsset);
            }
            Console.WriteLine($"--------------");


        }
        private static void DeployLibrary(DeployLibrary LibConfiguration, ClientContext context, string rootAsset)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying Library-----");
            List<Library> LibsConfig = LibConfiguration.Libs;
            for (int i = 0; i < LibsConfig.Count; i++)
            {
                Library LibConfig = LibsConfig[i];
                string LibTitleConfig = LibConfig.Title;

                List LibObject;

                //DELETE LIB

                if (context.Web.ListExists(LibTitleConfig))
                {
                    Console.WriteLine($"------{LibTitleConfig} existed, deleting------");

                    try
                    {
                        List oList = context.Web.Lists.GetByTitle(LibTitleConfig);
                        oList.DeleteObject();
                        context.ExecuteQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Exception {ex.Message} when deleting {LibTitleConfig}");
                    }

                }

                //CREATE LIB
                Console.WriteLine($"--------Creating {LibTitleConfig} lib--------");
                try
                {
                    ListCreationInformation libCreationInfo = new ListCreationInformation();
                    libCreationInfo.Title = LibTitleConfig;
                    libCreationInfo.TemplateType = (int)ListTemplateType.DocumentLibrary;
                    context.Web.Lists.Add(libCreationInfo);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception {ex.Message} when creating {LibTitleConfig} list");
                }


                //ADD FOLDER
                LibObject = context.Web.Lists.GetByTitle(LibTitleConfig);
                LibObject.EnableFolderCreation = true;
                List<DFolder> FoldersConfig = LibConfig.Folders;

                for (int j = 0; j < FoldersConfig.Count; j++)
                {
                    DFolder FolderConfig = FoldersConfig[j];
                    CreateItemInFolder(FolderConfig, LibObject, context, LibTitleConfig, rootAsset);
                }
                context.ExecuteQuery();
                Console.WriteLine($"--------Created {LibTitleConfig} lib--------");
            }
            Console.WriteLine($"-----------------------------------------------");

        }

        private static void DeployList(DeployList ListConfiguration, ClientContext context)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying List-----");

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
                        Console.WriteLine($"Exception {ex.Message} when deleting {ListTitleConfig}");
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
                    context.ExecuteQuery();
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
                                xml += $"<CHOICE>{Choice.Value}</CHOICE>";
                            }
                            xml += $"</CHOICES></Field>";
                        }
                        else
                        {
                            xml = $"<Field DisplayName='{FieldNameConfig}' Type='{FieldTypeConfig}' Name='{FieldNameConfig}' Required='{FieldIsRequiredConfig}' Format='{FieldFormatConfig}'/>";
                        }
                        //Console.WriteLine(xml);
                        ListObject.Fields.AddFieldAsXml(xml, true, AddFieldOptions.DefaultValue);
                        context.ExecuteQuery();
                        Console.WriteLine($"------Created {FieldNameConfig} field in {ListTitleConfig} list--------");

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Exception {ex.Message} when creating {FieldConfig.Name} field in {ListTitleConfig} list");
                    }
                }
                Console.WriteLine($"------Created {ListTitleConfig} list--------");
                Console.WriteLine($"--------------");
            }
            Console.WriteLine($"-----------------------------------------------");

        }


        private static void DeployPage(DeployPage PageConfig, ClientContext context)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying Page-----");


            //LOGO 
            try
            {
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
            }
            catch
            {

                PageObject = new ClientSidePage(context, ClientSidePageLayoutType.Home);
                PageObject.Save($"{PageNameConfig}");


                Console.WriteLine($"-----Created new page {PageNameConfig} ------");
            }

            //SECTION
            var SectionConfig = PageConfig.Sections;

                if (SectionConfig.Count > 0)
                {
                    for (int i = 0; i < SectionConfig.Count; i++)
                    {
                        Console.WriteLine($"-----Creating {i+1}/{SectionConfig.Count} section-----");

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
                                            break;
                                        default:
                                            PropertiesJson = "{\"listName\": \"" + WebpartListNameConfig + "\"}";
                                            break;
                                    }
                                    WebpartObject.PropertiesJson = PropertiesJson;
                                    PageObject.AddControl(WebpartObject, Section.Columns[WebpartColumnConfig]);

                                    Console.WriteLine($"-----Created {WebpartNameConfig} webpart-----");
                                    Console.WriteLine($"--------------");
                                }
                                catch (Exception ex) {
                                    Console.WriteLine(ex.Message);
                                }
                            }
                        }
                        else {
                            Console.WriteLine($"No webpart to create");
                        }
                        Console.WriteLine($"-----Created {i+1}/{SectionConfig.Count} section-----");

                    }
                    PageObject.Save();
                    PageObject.Publish();
                    Console.WriteLine($"-----Saved and Published page-----");

                }
                else {
                    Console.WriteLine($"No section to create");
                }

            Console.WriteLine($"-----------------------------------------------");

        }

        static void Main(string[] args)
        {


            var siteUrl = ConfigurationManager.AppSettings["siteUrl"];
            var username = ConfigurationManager.AppSettings["accountName"];
            var rootAsset = ConfigurationManager.AppSettings["rootAsset"];
            Console.WriteLine($"SharePoint Online User Name: {username}");
            Console.WriteLine("Please input user Password: ");

            var password = GetPassword();
            ClientContext context = new ClientContext(siteUrl);
            context.Credentials = new SharePointOnlineCredentials(username, password);
           
            var PageConfigXml = new XmlDocument();
            PageConfigXml.Load(@"Configuration\PageConfig.xml");
            DeployPage PageConfig = XmlUtility.ToObject<DeployPage>(PageConfigXml.InnerXml);

            var ListConfigXml = new XmlDocument();
            ListConfigXml.Load(@"Configuration\ListConfig.xml");
            DeployList ListConfig = XmlUtility.ToObject<DeployList>(ListConfigXml.InnerXml);

            var LibraryConfigXml = new XmlDocument();
            LibraryConfigXml.Load(@"Configuration\LibraryConfig.xml");
            DeployLibrary LibraryConfig = XmlUtility.ToObject<DeployLibrary>(LibraryConfigXml.InnerXml);

            var ItemConfigXml = new XmlDocument();
            ItemConfigXml.Load(@"Configuration\ItemConfig.xml");
            DeployItem ItemConfig = XmlUtility.ToObject<DeployItem>(ItemConfigXml.InnerXml);


            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();

            DeployList(ListConfig, context);
            DeployLibrary(LibraryConfig, context, rootAsset);
            DeployItem(ItemConfig, context, rootAsset);
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
