import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Collapse from "../Collapse/Collapse";
import Viewmore from "../Viewmore/Viewmore";

export default class HowDoI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faq: [], loading: true };
    // this.state.statuses = new Array(this.state.faq.length).fill(false);
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const response = await fetch("api/faq");
    const data = await response.json();
    this.setState({
      faq: data,
      loading: false,
      statuses: new Array(data.length).fill(false),
    });
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
    return this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
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
