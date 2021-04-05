import React from "react";
import "./index.css";

import Image from "../../Base/Image.jsx";

export default class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isOpenCollapse: props.isOpenCollapse,
      titleClass: "title-collapse",
      contentClass: "content-collapse content-collapse-close",
    };
    this.setClassCollapse = this.setClassCollapse.bind(this);
  }
  setClassCollapse() {
    if (this.props.isOpenCollapse) {
      this.setState({
        titleClass: "title-collapse active",
        contentClass: "content-collapse content-collapse-open",
      });
    } else {
      this.setState({
        titleClass: "title-collapse",
        contentClass: "content-collapse content-collapse-close",
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isOpenCollapse !== prevProps.isOpenCollapse) {
      this.setClassCollapse();
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <button
          className={this.state.titleClass}
          onClick={() =>
            this.props.changeAllCollapse(
              this.props.id,
              !this.props.isOpenCollapse
            )
          }
        >
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
