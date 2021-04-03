import React from "react";
import "./index.css";

import Image from "../../Base/Image.jsx";

export default class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCollapse: false,
      titleClass: "title-collapse",
      contentClass: "content-collapse-close",
    };
    this.switchCollapse = this.switchCollapse.bind(this);
    this.setClassCollapse = this.setClassCollapse.bind(this);
  }
  switchCollapse() {
    this.setState(
      { isOpenCollapse: !this.state.isOpenCollapse },
      this.setClassCollapse
    );
  }
  setClassCollapse() {
    if (this.state.isOpenCollapse) {
      this.setState({
        titleClass: "title-collapse active",
        contentClass: "content-collapse-open",
      });
    } else {
      this.setState({
        titleClass: "title-collapse",
        contentClass: "content-collapse-close",
      });
    }
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <button className={this.state.titleClass} onClick={this.switchCollapse}>
          <img className="thumb-img" src={Image.collapse} />
          <span>{this.props.item.question}</span>
        </button>
        <div className={this.state.contentClass}>
          A: {this.props.item.answer}
        </div>
      </div>
    );
  }
}
