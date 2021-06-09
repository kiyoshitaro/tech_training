import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class QuickLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const response = await fetch("quicklink");
    const data = await response.json();
    console.log(Image.icon);
    // debugger;
    this.setState({
      links: data,
      loading: false,
    });
  }

  render() {
    return (
      <div className="quicklink-grid-container">
        {this.state.links.map((item, index) => {
          return (
            <a className="quicklink-grid-item" key={index} href={item.link}>
              <img src={item.icon}></img>
              <p className="link-title">{item.title}</p>
            </a>
          );
        })}
      </div>
    );
  }
}
