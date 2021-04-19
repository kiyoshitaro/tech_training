import * as React from "react";
import styles from "./News.module.scss";
import { INewsProps, INewsStates } from "./INewsProps";
import { escape } from "@microsoft/sp-lodash-subset";

import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";

import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class News extends React.Component<INewsProps, INewsStates> {
  private _listService;

  constructor(props: INewsProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spContext });
    this.state = {
      posts: [],
    };
  }

  private _getData(listName) {
    this._listService = new List(listName);
    this._listService
      .getItems()
      .then((list) => {
        this.setState({
          posts: list.map((item) => {
            return {
              title: item.Title,
              content: item.content,
              time: item.time.split("T")[0],
              img: JSON.parse(item.img).serverRelativeUrl,
              tags: item.tags,
            };
          }),
        });
      })
      .catch(() => {
        this.setState({ posts: [] });
      });
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.listName != this.props.listName) {
      this._getData(nextProps.listName);
    }
  }

  public componentDidMount() {
    this._getData(this.props.listName);
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
