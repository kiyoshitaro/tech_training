using PnPSitesCoreDemo.Modules.DeployModules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace PnPSitesCoreDemo.Modules
{
    public abstract class IElements { }
    public class DeployElements : IElements
    {
        //[XmlElement(ElementName = "SiteColumnModule")]
        //public SiteColumnModule siteColumnModule { set; get; }

        [XmlElement(ElementName = "ListConfig")]
        public ListModule ListModule { set; get; }

        [XmlElement(ElementName = "LibraryConfig")]
        public LibModule LibModule { set; get; }

        [XmlElement(ElementName = "ItemConfig")]
        public ItemModule ItemModule { set; get; }


        [XmlElement(ElementName = "PageConfig")]
        public PageModule PageModule { set; get; }


    }


    [XmlRoot(ElementName = "Elements")]
    public class Elements
    {
        [XmlElement(ElementName = "HomeElements")]
        public DeployElements DeployElements { get; set; }
    }
}
