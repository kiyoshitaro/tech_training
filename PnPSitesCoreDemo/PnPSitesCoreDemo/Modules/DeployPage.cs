using System.Collections.Generic;
using System.Xml.Serialization;


namespace PnPSitesCoreDemo.Modules
{
    [XmlRoot(ElementName = "PageConfig")]

    public class DeployPage
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



}
