import * as React from "react";
import styles from "./Imagegallery.module.scss";
import { IImagegalleryProps, IImagegalleryStates } from "./IImagegalleryProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Image from "../../../assets/Image.jsx";
import Viewmore from "../../../common/viewmore/Viewmore";

export default class Imagegallery extends React.Component<
  IImagegalleryProps,
  IImagegalleryStates
> {
  constructor(props: IImagegalleryProps) {
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
  public render(): React.ReactElement<IImagegalleryProps> {
    return (
      <div>
        <p className={styles.topic}>Image Gallery</p>

        <div className={styles.imageGalleryContainer}>
          {this.state.images.map((item, index) => {
            return (
              <div key={index}>
                <img className={styles.imgLeft} src={item.src} />
              </div>
            );
          })}
        </div>
        <Viewmore url=""></Viewmore>
      </div>
    );
  }
}
