import * as React from 'react';
import styles from './Announcement.module.scss';
import { IAnnouncementProps,  IAnnouncementStates} from './IAnnouncementProps';

import Image from "../../../assets/Image.jsx";
import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";


import { sp} from "@pnp/sp/presets/all";
import {List} from "../../../common/container/List";

export default class Announcement extends React.Component<IAnnouncementProps, IAnnouncementStates> {
  private _listService;


  constructor(props: IAnnouncementProps) {
    
    super(props); 
    sp.setup({spfxContext: this.props.spContext});
    this._listService = new List("Announcement");

    this.state = {
      posts: [],
    };
}
public componentDidMount(){
  this._listService.getItems().then(list => {

    this.setState({posts: list.map(item =>{return {title: item.Title,content: item.content,time:item.time,img: JSON.parse(item.img).serverRelativeUrl, tags: item.tags}})});

  })
}

  public render(): React.ReactElement<IAnnouncementProps> {
    return (
      <div>
        <p className={styles.topic}>Announcement</p>

        {this.state.posts.map((item, index) => {
          return <Post key={index} item={item}></Post>;
        })}
        <Viewmore></Viewmore>
      </div>

    );
  }
}
