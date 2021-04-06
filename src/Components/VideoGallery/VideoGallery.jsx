import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Viewmore from "../Viewmore/Viewmore";

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
        <div className="image-gallery-container">
          {this.state.videos.map((item, index) => {
            return (
              <div key={index}>
                <video className="video-left" controls>
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })}
        </div>
        <Viewmore></Viewmore>
      </div>
    );
  }
}
