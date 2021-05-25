using System;
using System.Collections.Generic;
using System.Linq;
using OfficeDevPnP.Core.Pages;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.SharePoint.Client;
using System.IO;
using SP = Microsoft.SharePoint.Client;

namespace PnPSitesCoreDemo.Modules.DeployModules
{

    [XmlRoot(ElementName = "ItemConfig")]

    public class ListItems
    {
        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "Item")]
        public List<Item> Items { set; get; }

    }

    public class Item
    {

        [XmlElement(ElementName = "Field")]
        public List<ItemField> ItemFields { set; get; }
    }
    public class ItemField
    {
        [XmlAttribute(AttributeName = "Key")]
        public string Key { get; set; }
        [XmlAttribute(AttributeName = "Value")]
        public string Value { get; set; }

    }
    public class ItemModule: IDeployModule
    {

        private string UploadImage(string value, ClientContext context)
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
                try
                {
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
        [XmlElement(ElementName = "List")]
        public List<ListItems> ListItemsConfig { get; set; }

        [XmlAttribute(AttributeName = "rootAsset")]
        public string rootAsset { get; set; }



        public void Deploy(ClientContext context)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying Item-----");

            //LIST
            for (int i = 0; i < this.ListItemsConfig.Count; i++)
            {
                ListItems ListItemConfig = this.ListItemsConfig[i];
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
                    while (collListItem.Count > 0)
                    {
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
                    for (int j = 0; j < ItemsConfig.Count; j++)
                    {


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
                                        oListItem[KeyConfig] = UploadImage(Path.Combine(this.rootAsset, ValueConfig), context);
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

                        Console.WriteLine($"------Added {j + 1}/{ItemsConfig.Count} items");

                    }
                    Console.WriteLine($"------Added all {ItemsConfig.Count} items in {ListTitleConfig} list------");
                    Console.WriteLine($"--------------");
                }
                else
                {
                    Console.WriteLine($"------ No item to create in {ListTitleConfig} list------");
                }
            }
            Console.WriteLine($"-----------------------------------------------");
        }


    }
}
