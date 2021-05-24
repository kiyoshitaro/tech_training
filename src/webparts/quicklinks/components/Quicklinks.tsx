import * as React from "react";
import styles from "./Quicklinks.module.scss";
import { IQuicklinksProps, IQuicklinksStates } from "./IQuicklinksProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class Quicklink extends React.Component<
  IQuicklinksProps,
  IQuicklinksStates
> {
  private _listService;

  constructor(props: IQuicklinksProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spContext });
    this.state = {
      links: [],
    };
    this._getData = this._getData.bind(this);
  }

  private _getData() {
    var properties = ["icon", "link"];
    this._listService
      .getItems()
      .then((list) => {
        if (properties.every((v) => v in list[0])) {
          this.setState({
            links: list.map((item) => {
              return {
                title: item.Title,
                icon: JSON.parse(item.icon).serverRelativeUrl,
                link: item.link,
              };
            }),
          });
        }
      })
      .catch(() => {
        this.setState({ links: [] });
      });
  }

  public componentDidMount() {
    this._listService = new List(this.props.listName);
    this._getData();
  }
  public componentDidUpdate(prevProps) {
    if (prevProps.listName != this.props.listName) {
      this._listService = new List(this.props.listName);
      this._getData();
    }
  }

  public render(): React.ReactElement<IQuicklinksProps> {
    return (
      <div>
        <p className={styles.topic}>Quick Links</p>

        <div className={styles.quicklinkGridContainer}>
          {this.state.links.map((item, index) => {
            return (
              <a
                className={styles.quicklinkGridItem}
                key={index}
                href={item.link}
              >
                <img src={item.icon}></img>
                <p className={styles.linkTitle}>{item.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
