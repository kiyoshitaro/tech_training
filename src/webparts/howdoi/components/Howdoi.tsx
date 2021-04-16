import * as React from 'react';
import styles from './Howdoi.module.scss';
import { IHowdoiProps, IHowdoiStates } from './IHowdoiProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Viewmore from "../../../common/viewmore/Viewmore";
import Collapse from "../../../common/collapse/Collapse";

import { sp} from "@pnp/sp/presets/all";
import {List} from "../../../common/container/List";

export default class Howdoi extends React.Component<IHowdoiProps, IHowdoiStates> {
  private _listService;
  constructor(props: IHowdoiProps){
    super(props);
    // console.log(this.props.spContext,"pppppppp");
    sp.setup({spfxContext: this.props.spContext});
    this._listService = new List("faq");

    this.state = {
      faq: [
      ],
    };
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
  }
  public componentDidMount(){
    this._listService.getItems().then(list => {

      this.setState({faq: list.map(item =>{return {question: item.question,answer: item.answer,status:false}})});

    })
  }
  public changeAllCollapse(key:number, value: boolean) {
    this.setState((state) => {
      const faq = state.faq.map((item, j) => {
        if (j === key) {
          return {...item,status:value};
        } else {
          return {...item,status:false};
        }
      });
      return {
        faq,
      };
    });
  }


  public render(): React.ReactElement<IHowdoiProps> {
    return (
      <div className={styles.howdoi}>
        <p className={styles.topic}>How do i</p>

        <form>
          <input
            className= {styles.searchBox}
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
        <Viewmore></Viewmore>
      </div>

    );
  }
}
