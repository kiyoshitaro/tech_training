import * as React from "react";
import styles from "./Announcement.module.scss";
import { IAnnouncementProps, IAnnouncementStates } from "./IAnnouncementProps";

import Post from "../../../common/post/Post";
import Viewmore from "../../../common/viewmore/Viewmore";

import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class Announcement extends React.Component<
  IAnnouncementProps,
  IAnnouncementStates
> {
  private _listService;

  constructor(props: IAnnouncementProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spContext });
    this.state = {
      posts: [],
      currPage: 1,
      maxPage: 1,
      dataLoader: "",
    };
    this._getSpecificPage = this._getSpecificPage.bind(this);
    this._getPreviousPage = this._getPreviousPage.bind(this);
    this._getNextPage = this._getNextPage.bind(this);
    this._getData = this._getData.bind(this);
  }
  private _getNextPage() {
    if (this.state.currPage === this.state.maxPage) {
      this._getData(this.state.dataLoader);
      this.setState({ maxPage: this.state.maxPage + 1 });
    }
    this.setState({ currPage: this.state.currPage + 1 });
  }
  private _getPreviousPage() {
    this.setState({
      currPage: this.state.currPage - 1,
    });
  }
  private _getSpecificPage(pageNum) {
    this.setState({
      currPage: pageNum,
    });
  }
  private _getData(dataLoader) {
    var properties = ["content", "time", "img", "tags"];
    if (properties.every((v) => v in dataLoader.results[0])) {
      this.setState({
        posts: [
          ...this.state.posts,
          ...dataLoader.results.map((item) => {
            return {
              id: item.Id,
              title: item.Title,
              content: item.content,
              time: item.time.split("T")[0],
              img: JSON.parse(item.img).serverRelativeUrl,
              tags: item.tags,
            };
          }),
        ],
      });
      dataLoader.getNext().then((dl) => {
        this.setState({ dataLoader: dl });
      });
    } else {
      this.setState({ posts: [] });
    }
  }

  public componentDidUpdate(prevProps) {
    if (
      prevProps.listName != this.props.listName ||
      prevProps.postPerPage != this.props.postPerPage
    ) {
      this._listService = new List(this.props.listName);
      this._listService
        .getItemWithPage(this.props.postPerPage)
        .then((list) => {
          this._getData(list);
        })
        .catch(() => {
          this.setState({ posts: [] });
        });
    }
  }

  public componentDidMount() {
    this._listService = new List(this.props.listName);
    this._listService
      .getItemWithPage(this.props.postPerPage)
      .then((list) => {
        this._getData(list);
      })
      .catch(() => {
        this.setState({ posts: [] });
      });
  }
  public render(): React.ReactElement<IAnnouncementProps> {
    return (
      <div>
        <p className={styles.topic}>Announcement</p>

        {this.state.posts &&
          this.state.posts
            .slice(
              this.props.postPerPage * (this.state.currPage - 1),
              this.props.postPerPage * this.state.currPage
            )
            .map((item, index) => {
              return <Post key={index} item={item}></Post>;
            })}

        <div className={styles.pagination}>
          {this.state.currPage > 1 && (
            <a href="#" onClick={this._getPreviousPage}>
              &laquo;
            </a>
          )}

          {/* {[...Array(this.state.maxPage)].map((x, i) => {
            console.log(x, i);
            return (
              <>
                {i === this.state.currPage ? (
                  <a
                    href="#"
                    className={styles.active}
                    onClick={() => this._getSpecificPage(i)}
                  >
                    {i}
                  </a>
                ) : (
                  <a href="#" onClick={() => this._getSpecificPage(i)}>
                    {i}
                  </a>
                )}
              </>
            );
          })} */}

          <a href="#" className={styles.active}>
            {this.state.currPage}
          </a>
          {(this.state.dataLoader ||
            this.state.currPage !== this.state.maxPage) && (
            <a href="#" onClick={this._getNextPage}>
              &raquo;
            </a>
          )}
        </div>
        {/* <Viewmore url="https://vndevcore.sharepoint.com/sites/brown/SitePages/Announcement.aspx"></Viewmore> */}
      </div>
    );
  }
}
