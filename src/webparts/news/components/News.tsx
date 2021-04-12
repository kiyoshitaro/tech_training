import * as React from 'react';
import styles from './News.module.scss';
import { INewsProps, INewsStates } from './INewsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import Image from "../../../assets/Image.jsx";
import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";

export default class News extends React.Component<INewsProps, INewsStates> {

  

  constructor(props: INewsProps) {
    super(props); 
    this.state = {
      posts: [
        {
          title: "Tommorrow healthy check",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: [],
          img: Image.markgroup_1,
        },
        {
          title: "Air-conditioning is broken",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: [],
          img: Image.markgroup_2,
        },
        {
          title: "Keep running",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: [],
          img: Image.markgroup_3,
        },
        {
          title: "IT maintainance",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dolor metus, interdum at scelerisque in, porta at lacus. Maecenas dapibus luctus cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          time: "05/jan/2021",
          tags: [],
          img: Image.markgroup_4,
        },
      ],
    };
}

  public render(): React.ReactElement<INewsProps> {
    return (
      <div>
                <p className={styles.topic}>News</p>

        {this.state.posts.map((item, index) => {
          return <Post key={index} item={item}></Post>;
        })}
        <Viewmore></Viewmore>
      </div>
    );
  }
}
