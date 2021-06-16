import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class Viewmore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a
        href="#"
        className="thumb-title viewmore"
        onClick={this.props.viewMore}
      >
        View more
        <img className="thumb-img" src={Image.arrowicon} />
      </a>
    );
  }
}
