import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Collapse from "../Collapse/Collapse";
import Viewmore from "../Viewmore/Viewmore";

export default class HowDoI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faq: [
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
      ],
      // statuses: new Array(this.faq.length).fill(false),
    };
    this.state.statuses = new Array(this.state.faq.length).fill(false);
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
  }
  changeAllCollapse(key, value) {
    this.setState((state) => {
      const statuses = state.statuses.map((item, j) => {
        if (j === key) {
          return value;
        } else {
          return false;
        }
      });
      return {
        statuses,
      };
    });
  }
  render() {
    return (
      <div className="howdoi">
        <form>
          <input
            className="search-box "
            type="text"
            name="search"
            placeholder="Find Questions"
          />
        </form>
        <div>
          {this.state.faq.map((item, index) => {
            return (
              <Collapse
                key={index}
                id={index}
                item={item}
                changeAllCollapse={this.changeAllCollapse}
                isOpenCollapse={this.state.statuses[index]}
              ></Collapse>
            );
          })}
        </div>
        <Viewmore></Viewmore>
      </div>
    );
  }
}
