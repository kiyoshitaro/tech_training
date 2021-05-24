import * as React from "react";
import styles from "./Howdoi.module.scss";
import { IHowdoiProps, IHowdoiStates } from "./IHowdoiProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Viewmore from "../../../common/viewmore/Viewmore";
import Collapse from "../../../common/collapse/Collapse";

import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class Howdoi extends React.Component<
  IHowdoiProps,
  IHowdoiStates
> {
  private _listService;
  constructor(props: IHowdoiProps) {
    super(props);
    // console.log(this.props.spContext,"pppppppp");
    sp.setup({ spfxContext: this.props.spContext });

    this.state = {
      faq: [],
    };
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
    this._getData = this._getData.bind(this);
  }

  private _getData() {
    var properties = ["question", "answer"];

    this._listService
      .getItems()
      .then((list) => {
        if (properties.every((v) => v in list[0])) {
          this.setState({
            faq: list.map((item) => {
              return {
                question: item.question,
                answer: item.answer,
                status: false,
              };
            }),
          });
        }
      })
      .catch(() => {
        this.setState({ faq: [] });
      });
  }
  public componentDidUpdate(prevProps) {
    if (prevProps.listName != this.props.listName) {
      this._listService = new List(this.props.listName);
      this._getData();
    }
  }

  public componentDidMount() {
    this._listService = new List(this.props.listName);
    this._getData();
  }
  public changeAllCollapse(key: number, value: boolean) {
    this.setState((state) => {
      const faq = state.faq.map((item, j) => {
        if (j === key) {
          return { ...item, status: value };
        } else {
          return { ...item, status: false };
        }
      });
      return {
        faq,
      };
    });
  }

  public render(): React.ReactElement<IHowdoiProps> {
    return (
      <div>
        <div className={styles.howdoi}>
          <p className={styles.topic}>How do i</p>

          <form>
            <input
              className={styles.searchBox}
              type="text"
              name="search"
              placeholder="Find Questions"
            />
          </form>
          <div>
            {this.state.faq.map((item, index) => {
              return (
                <Collapse
                  key={index}
                  id={index}
                  item={item}
                  changeAllCollapse={this.changeAllCollapse}
                  isOpenCollapse={this.state.faq[index].status}
                ></Collapse>
              );
            })}
          </div>
        </div>
        <Viewmore url="https://vndevcore.sharepoint.com/sites/brown/Lists/faq/AllItems.aspx"></Viewmore>
      </div>
    );
  }
}
