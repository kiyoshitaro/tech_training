import React from "react";
import Image from "../../Base/Image.jsx";
import "./index.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ marginBottom: "80px" }}>
        <img className="img_thumbnail" src={this.props.item.img} />
        <p className="post-title">{this.props.item.title}</p>
        <p className="post-content">{this.props.item.content}</p>

        <img className="img_thumbnail" src={Image.date} />
        <p className="post-time">{this.props.item.time}</p>

        {this.props.item.tags.map((tag) => {
          return <span className="tag">{tag}</span>;
        })}
      </div>
    );
  }
}
