using System;
using System.Collections.Generic;
using System.Linq;
using OfficeDevPnP.Core.Pages;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.SharePoint.Client;

namespace PnPSitesCoreDemo.Modules.DeployModules
{
    public class DList
    {

        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "Field")]
        public List<DField> Fields { set; get; }

    }
    public class DField
    {
        [XmlAttribute(AttributeName = "Name")]
        public string Name { get; set; }

        [XmlAttribute(AttributeName = "Type")]
        public string Type { get; set; }

        [XmlAttribute(AttributeName = "IsRequired")]
        public string IsRequired { get; set; }

        [XmlAttribute(AttributeName = "Format")]
        public string Format { get; set; }


        [XmlElement(ElementName = "Choice")]
        public List<DChoice> Choices { set; get; }

    }
    public class DChoice
    {

        [XmlAttribute(AttributeName = "Value")]
        public string Value { get; set; }

    }

    public class ListModule: IDeployModule
    {
        [XmlElement(ElementName = "List")]
        public List<DList> ListsConfig { get; set; }

        public void Deploy( ClientContext context)
        {
            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying List-----");

            Web oWebsite = context.Web;

            for (int i = 0; i < this.ListsConfig.Count; i++)
            {
                DList ListConfig = this.ListsConfig[i];

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


    }
}
