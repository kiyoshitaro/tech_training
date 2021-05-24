using System.Collections.Generic;
using System.Xml.Serialization;


namespace PnPSitesCoreDemo.Modules
{
    [XmlRoot(ElementName = "LibraryConfig")]

    public class DeployLibrary
    {

        [XmlElement(ElementName = "Library")]
        public List<Library> Libs { set; get; }

    }
    public class Library
    {

        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "Folder")]
        public List<DFolder> Folders { set; get; }

    }
    public class DFolder
    {
        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "File")]
        public List<DFile> Files { set; get; }

        [XmlElement(ElementName = "Folder")]
        public List<DFolder> Folders { set; get; }


    }
    public class DFile
    {
        [XmlAttribute(AttributeName = "Path")]
        public string Path { get; set; }

    }

}
