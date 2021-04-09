import * as React from 'react';
import styles from './Announcement.module.scss';
import { IAnnouncementProps,  IAnnouncementStates} from './IAnnouncementProps';

import Image from "../../../assets/Image.jsx";
import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";


export default class Announcement extends React.Component<IAnnouncementProps, IAnnouncementStates> {


  constructor(props: IAnnouncementProps) {
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

  public render(): React.ReactElement<IAnnouncementProps> {
    return (
      <div>
        {this.state.posts.map((item, index) => {
          return <Post key={index} item={item}></Post>;
        })}
        <Viewmore></Viewmore>
      </div>

    );
  }
}
