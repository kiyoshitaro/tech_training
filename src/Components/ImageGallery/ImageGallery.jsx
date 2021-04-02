import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

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
      <div className="container">
        {this.state.images.map((item, index) => {
          return (
            <div key={index}>
              <img className="img_thumbnail" src={item.src} />
            </div>
          );
        })}
      </div>
    );
  }
}
