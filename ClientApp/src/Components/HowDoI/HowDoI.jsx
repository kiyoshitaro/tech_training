import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Collapse from "../Collapse/Collapse";
import Viewmore from "../Viewmore/Viewmore";

export default class HowDoI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faq: [],
      loading: true,
      pageNum: 0,
      pageSize: 3,
      currPage: 0,
    };
    // this.state.statuses = new Array(this.state.faq.length).fill(false);
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
    this.viewMoreFaq = this.viewMoreFaq.bind(this);
  }
  async componentDidMount() {
    const response = await fetch(
      `api/faq?start=${this.state.currPage}&limit=${this.state.pageSize}`
    );
    const data = await response.json();
    this.setState({
      faq: data.data,
      loading: false,
      pageNum: data.pageNum,
      statuses: new Array(data.data.length).fill(false),
    });
  }
  async fetchData(currPage, pageSize) {
    const response = await fetch(`api/faq?start=${currPage}&limit=${pageSize}`);
    const data = await response.json();
    // debugger;
    this.setState({
      faq: [...this.state.faq, ...data.data],
      loading: false,
      statuses: [
        ...this.state.statuses,
        ...new Array(data.data.length).fill(false),
      ],
    });
  }
  viewMoreFaq(e) {
    e.preventDefault();
    this.setState({ currPage: this.state.currPage + 1, loading: true }, () =>
      this.fetchData(this.state.currPage, this.state.pageSize)
    );
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
        {this.state.currPage + 1 < this.state.pageNum && (
          <Viewmore viewMore={this.viewMoreFaq}></Viewmore>
        )}
      </div>
    );
  }
}
