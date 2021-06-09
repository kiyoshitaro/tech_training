import React from "react";
// import "./index.css";
import Image from "../../Base/Image.jsx";
import Post from "../Post/Post";
import Viewmore from "../Viewmore/Viewmore";

export default class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const response = await fetch("announcement");
    const data = await response.json();
    // debugger;
    this.setState({
      posts: data,
      loading: false,
    });
  }

  render() {
    return this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        {this.state.posts.map((item, index) => {
          return <Post key={index} item={item}></Post>;
        })}
        <Viewmore></Viewmore>
      </div>
    );
  }
}
