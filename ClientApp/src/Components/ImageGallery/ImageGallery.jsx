import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Viewmore from "../Viewmore/Viewmore";

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { src: Image.image_gallery },
        { src: Image.image_gallery_1 },
        { src: Image.image_gallery_2 },
        { src: Image.image_gallery_3 },
      ],
    };
  }
  render() {
    return (
      <div>
        <div className="image-gallery-container">
          {this.state.images.map((item, index) => {
            return (
              <div key={index}>
                <img className="img-left" src={item.src} />
              </div>
            );
          })}
        </div>
        <Viewmore></Viewmore>
      </div>
    );
  }
}
