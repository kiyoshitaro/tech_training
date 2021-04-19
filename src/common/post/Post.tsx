import * as React from "react";

import styles from "./Post.module.scss";
import { IPostProps, IPostStates } from "./IPost";
import Image from "../../assets/Image.jsx";

export default class Viewmore extends React.Component<IPostProps, IPostStates> {
  constructor(props: IPostProps) {
    super(props);
  }
  public render(): React.ReactElement<IPostProps> {
    return (
      <div className={styles.post}>
        <img className={styles.imgLeft} src={this.props.item.img} />
        <p className={styles.postTitle}>{this.props.item.title}</p>
        <p className={styles.postContent}>{this.props.item.content}</p>
        <div className={styles.thumbTitle}>
          <img className={styles.thumbImg} src={Image.date} />
          <p className={styles.postTime}>{this.props.item.time}</p>
          {this.props.item.tags &&
            this.props.item.tags.map((tag) => {
              return <span className={styles.tag}>{tag}</span>;
            })}
        </div>
      </div>
    );
  }
}
