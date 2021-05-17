using System.Collections.Generic;
using System.Xml.Serialization;


namespace PnPSitesCoreDemo.Modules
{
    [XmlRoot(ElementName = "ListConfig")]

    public class DeployList
    {

        [XmlElement(ElementName = "List")]
        public List<DList> Lists { set; get; }

    }
    public class DList {

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

        
    }
}
