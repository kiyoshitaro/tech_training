import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class QuickLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { icon: Image.icon, link: "#", title: "Training" },
        { icon: Image.icon_1, link: "#", title: "Organization" },
        { icon: Image.icon_2, link: "#", title: "Task" },
        { icon: Image.icon_3, link: "#", title: "Global Sales" },
        { icon: Image.icon_4, link: "#", title: "Birthday" },
        { icon: Image.icon_5, link: "#", title: "Health" },
        { icon: Image.icon_6, link: "#", title: "Service Desk" },
        { icon: Image.icon_7, link: "#", title: "Truck" },
        { icon: Image.icon_8, link: "#", title: "Idea" },
      ],
    };
  }
  render() {
    return (
      <div className="grid-container">
        {this.state.links.map((item, index) => {
          return (
            <a className="grid-item" key={index} href={item.link}>
              <img src={item.icon}></img>
              <p className="link-content">{item.title}</p>
            </a>
          );
        })}
      </div>
    );
  }
}
