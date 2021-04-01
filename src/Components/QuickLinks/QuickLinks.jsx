import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class QuickLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { icon: Image.icon, link: "#" },
        { icon: Image.icon_1, link: "#" },
        { icon: Image.icon_2, link: "#" },
        { icon: Image.icon_3, link: "#" },
        { icon: Image.icon_4, link: "#" },
        { icon: Image.icon_5, link: "#" },
        { icon: Image.icon_6, link: "#" },
        { icon: Image.icon_7, link: "#" },
        { icon: Image.icon_8, link: "#" },
      ],
    };
  }
  render() {
    return (
      <div class="grid-container">
        {this.state.links.map((item, index) => {
          return (
            <a class="grid-item" key={index} href={item.link}>
              <img src={item.icon}></img>
            </a>
          );
        })}
      </div>
    );
  }
}
