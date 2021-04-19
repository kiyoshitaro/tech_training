import * as React from "react";
import styles from "./News.module.scss";
import { INewsProps, INewsStates } from "./INewsProps";
import { escape } from "@microsoft/sp-lodash-subset";

import Image from "../../../assets/Image.jsx";
import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";

import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class News extends React.Component<INewsProps, INewsStates> {
  private _listService;

  constructor(props: INewsProps) {
    super(props);

    sp.setup({ spfxContext: this.props.spContext });
    this._listService = new List("News");

    this.state = {
      posts: [],
    };
  }
  public componentDidMount() {
    this._listService.getItems().then((list) => {
      console.log(list);

      this.setState({
        posts: list.map((item) => {
          console.log(item.time);
          return {
            title: item.Title,
            content: item.content,
            time: item.time,
            img: JSON.parse(item.img).serverRelativeUrl,
            tags: item.tags,
          };
        }),
      });
    });
  }

  public render(): React.ReactElement<INewsProps> {
    return (
      <div>
        <p className={styles.topic}>News</p>

        {this.state.posts &&
          this.state.posts.map((item, index) => {
            return <Post key={index} item={item}></Post>;
          })}
        <Viewmore></Viewmore>
      </div>
    );
  }
}
