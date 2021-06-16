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
      currPage: 0,
      pageSize: 3,
      pageNum: 0,
    };
    this._getPreviousPage = this._getPreviousPage.bind(this);
    this._getNextPage = this._getNextPage.bind(this);
    this._getSpecificPage = this._getSpecificPage.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);
  }
  async componentDidMount() {
    const response = await fetch(
      `api/announcement?start=${this.state.currPage}&limit=${this.state.pageSize}`
    );
    const data = await response.json();
    // debugger;
    this.setState({
      posts: data.data,
      loading: false,
      pageNum: data.pageNum,
    });
  }
  async fetchData(currPage, pageSize) {
    const response = await fetch(
      `api/announcement?start=${currPage}&limit=${pageSize}`
    );
    const data = await response.json();
    // debugger;
    this.setState({
      posts: data.data,
      loading: false,
    });
  }
  _getPreviousPage() {
    this.setState({ currPage: this.state.currPage - 1, loading: true }, () =>
      this.fetchData(this.state.currPage, this.state.pageSize)
    );
  }
  _getNextPage() {
    this.setState({ currPage: this.state.currPage + 1, loading: true }, () =>
      this.fetchData(this.state.currPage, this.state.pageSize)
    );
  }
  _getSpecificPage(page) {
    this.setState({ currPage: page, loading: true }, () =>
      this.fetchData(this.state.currPage, this.state.pageSize)
    );
  }
  async deletePost(id) {
    const response = await fetch("api/announcement/" + id, {
      method: "DELETE",
    });
    const id_ = await response.json();
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== id_),
    });
  }
  async editPost(post) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };
    const response = await fetch("api/announcement/" + post.id, requestOptions);
  }

  render() {
    return this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        {this.state.posts.map((item, index) => {
          return (
            <Post
              key={index}
              item={item}
              deletePost={this.deletePost}
              editPost={this.editPost}
            ></Post>
          );
        })}
        <div className="pagination">
          {this.state.currPage > 0 && (
            <a onClick={this._getPreviousPage}>&laquo;</a>
          )}

          {[...Array(this.state.pageNum)].map((x, i) => {
            {
              /* console.log(x, i); */
            }
            return (
              <>
                {i === this.state.currPage ? (
                  <a
                    className="pagination active"
                    onClick={() => this._getSpecificPage(i)}
                  >
                    {i}
                  </a>
                ) : (
                  <a onClick={() => this._getSpecificPage(i)}>{i}</a>
                )}
              </>
            );
          })}
          {this.state.posts.length === this.state.pageSize && (
            <a onClick={this._getNextPage}>&raquo;</a>
          )}
        </div>
      </div>
    );
  }
}
