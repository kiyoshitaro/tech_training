import React from "react";
// import "./index.css";
import Image from "../../Base/Image.jsx";
import Post from "../Post/Post";

export default class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "IT maintainance",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: ["Human Resource"],
          img: Image.image_gallery,
        },
        {
          title: "IT maintainance",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: ["Human Resource"],
          img: Image.image_gallery_1,
        },
        {
          title: "IT maintainance",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: ["Human Resource"],
          img: Image.image_gallery_2,
        },
        {
          title: "IT maintainance",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: ["Human Resource"],
          img: Image.image_gallery_3,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        {this.state.posts.map((item, index) => {
          return <Post key={index} item={item}></Post>;
        })}
        <a className="thumb-title viewmore" href="#">
          View more
          <img className="thumb-img" src={Image.arrowicon} />
        </a>
      </div>
    );
  }
}
