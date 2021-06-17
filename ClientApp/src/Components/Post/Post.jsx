import React from "react";
import Image from "../../Base/Image.jsx";
import "./index.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      item: props.item,
    };
    this.handleChange = this.handleChange.bind(this);
    this.openEditPost = this.openEditPost.bind(this);
    this.submitEditPost = this.submitEditPost.bind(this);
  }
  handleChange(event) {
    this.setState({
      item: { ...this.state.item, [event.target.name]: event.target.value },
    });
  }
  openEditPost() {
    this.setState({ isEdit: true });
    // this.props.editPost({ ...this.props.item });
  }
  submitEditPost(post) {
    this.setState({ isEdit: false });
    this.props.editPost(post);
  }

  render() {
    return (
      <div>
        <div className="post">
          <img className="img-left" src={this.state.item.img} />
          {this.state.isEdit ? (
            <div>
              <input
                className="post-title"
                onChange={this.handleChange}
                value={this.state.item.title}
                name="title"
              />
              <textarea
                style={{ width: "70%" }}
                className="post-content"
                onChange={this.handleChange}
                value={this.state.item.content}
                name="content"
              />
              <div className="thumb-title">
                <img className="thumb-img" src={Image.date} />
                <input
                  className="post-time"
                  onChange={this.handleChange}
                  value={this.state.item.time}
                  name="time"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="post-title">{this.state.item.title}</p>
              <p className="post-content">{this.state.item.content}</p>
              <div className="thumb-title">
                <img className="thumb-img" src={Image.date} />
                <p className="post-time">{this.state.item.time}</p>
              </div>
            </>
          )}
          <div>
            {this.state.item.tags &&
              this.state.item.tags.map((tag) => {
                return <span className="tag">{tag}</span>;
              })}
          </div>
          <div style={{ float: "right" }}>
            <button className="button button2" onClick={this.openEditPost}>
              Edit
            </button>
            {this.state.isEdit ? (
              <button
                className="button button1"
                onClick={() => this.submitEditPost(this.state.item)}
              >
                Submit
              </button>
            ) : (
              <button
                className="button button3"
                onClick={() => this.props.deletePost(this.state.item.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
