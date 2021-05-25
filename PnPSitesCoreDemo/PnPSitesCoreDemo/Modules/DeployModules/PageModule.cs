using System;
using System.Collections.Generic;
using System.Linq;
using OfficeDevPnP.Core.Pages;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.SharePoint.Client;

namespace PnPSitesCoreDemo.Modules.DeployModules
{

    public class Page
    {
        [XmlAttribute(AttributeName = "Name")]
        public string Name { set; get; }
        [XmlAttribute(AttributeName = "LogoUrl")]
        public string LogoUrl { set; get; }

        [XmlElement(ElementName = "Section")]
        public List<Section> Sections { set; get; }

    }

    public class Section
    {
        [XmlAttribute(AttributeName = "SectionType")]
        public string SectionType { get; set; }

        [XmlElement("WebPart")]
        public List<WebPart> WebParts { set; get; }

    }
    public class WebPart
    {
        [XmlAttribute(AttributeName = "Name")]
        public string Name { get; set; }

        [XmlAttribute(AttributeName = "ListName")]
        public string ListName { get; set; }

        [XmlAttribute(AttributeName = "PostPerPage")]
        public int PostPerPage { get; set; }

        [XmlAttribute(AttributeName = "Column")]
        public int Column { get; set; }
    }

    public class PageModule : IDeployModule
    {
        private static Dictionary<string, CanvasSectionTemplate> SectionTypeMapping = new Dictionary<string, CanvasSectionTemplate>() {
             { "OneColumn", CanvasSectionTemplate.OneColumn },
            { "TwoColumnLeft", CanvasSectionTemplate.TwoColumnLeft }

        };



        [XmlElement(ElementName = "Page")]
        public List<Page> PagesConfig { get; set; }

        public void Deploy(ClientContext context)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying Page-----");

            foreach (Page PageConfig in this.PagesConfig)
            {

                //LOGO 
                try
                {
                    var web = context.Web;
                    //context.Load(web, p => p.Title);
                    string SiteLogoUrl = PageConfig.LogoUrl;
                    web.SiteLogoUrl = SiteLogoUrl;
                    web.Update();
                    context.ExecuteQuery();
                    Console.WriteLine($"-----Changed Logo-----");
                    Console.WriteLine($"--------------");
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
                }
                catch
                {

                    PageObject = new ClientSidePage(context, ClientSidePageLayoutType.Home);
                    PageObject.Save($"{PageNameConfig}");
                    Console.WriteLine($"-----Created new page {PageNameConfig} ------");
                }
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
                        Console.WriteLine($"-----Creating {i + 1}/{SectionConfig.Count} section-----");

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
                                catch (Exception ex)
                                {
                                    Console.WriteLine(ex.Message);
                                }
                            }
                        }
                        else
                        {
                            Console.WriteLine($"No webpart to create");
                        }
                        Console.WriteLine($"-----Created {i + 1}/{SectionConfig.Count} section-----");

                    }
                    PageObject.Save();
                    PageObject.Publish();
                    Console.WriteLine($"-----Saved and Published page-----");

                }
                else
                {
                    Console.WriteLine($"No section to create");
                }

                Console.WriteLine($"-----------------------------------------------");
            }

        }

    }
}
