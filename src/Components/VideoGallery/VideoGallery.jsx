import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class VideoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [
        { src: Image.video },
        { src: Image.video_1 },
        { src: Image.video_2 },
        { src: Image.video_3 },
      ],
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          {this.state.videos.map((item, index) => {
            return (
              <div key={index}>
                <video className="video-thumb" controls>
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })}
        </div>
        <a className="thumb-title viewmore" href="#">
          View more
          <img className="thumb-img" src={Image.arrowicon} />
        </a>
      </div>
    );
  }
}
