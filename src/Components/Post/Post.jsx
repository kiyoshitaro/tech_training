import React from "react";
import Image from "../../Base/Image.jsx";
import "./index.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.item.img);
    return (
      <div style={{ marginBottom: "80px" }}>
        <img className="img_align" src={this.props.item.img} />
        <p className="title">{this.props.item.title}</p>
        <p className="content">{this.props.item.content}</p>

        <img className="img_align" src={Image.date} />
        <p className="time">{this.props.item.time}</p>

        {this.props.item.tags.map((tag) => {
          return <span className="tag">{tag}</span>;
        })}
      </div>
    );
  }
}
