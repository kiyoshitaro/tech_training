import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Collapse from "../Collapse/Collapse";
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
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
      ],
    };
  }
  render() {
    return (
      <div>
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
            return <Collapse key={index} item={item}></Collapse>;
          })}
        </div>
        <a
          className="thumb-title viewmore"
          href="#"
          style={{ marginTop: "20px" }}
        >
          View more
          <img className="thumb-img" src={Image.arrowicon} />
        </a>
      </div>
    );
  }
}
