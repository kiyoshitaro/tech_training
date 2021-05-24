using System.Collections.Generic;
using System.Xml.Serialization;


namespace PnPSitesCoreDemo.Modules
{
    [XmlRoot(ElementName = "ItemConfig")]

    public class DeployItem
    {

        [XmlElement(ElementName = "List")]
        public List<ListItems> ListItems { set; get; }

    }
    public class ListItems {
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
    public class ItemField {
        [XmlAttribute(AttributeName = "Key")]
        public string Key { get; set; }
        [XmlAttribute(AttributeName = "Value")]
        public string Value { get; set; }

    }
}
