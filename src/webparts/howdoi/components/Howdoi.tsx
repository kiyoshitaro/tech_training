import * as React from 'react';
import styles from './Howdoi.module.scss';
import { IHowdoiProps, IHowdoiStates } from './IHowdoiProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Viewmore from "../../../common/viewmore/Viewmore";
import Collapse from "../../../common/collapse/Collapse";


export default class Howdoi extends React.Component<IHowdoiProps, IHowdoiStates> {
  constructor(props: IHowdoiProps){
    super(props);
    this.state = {
      faq: [
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
        {
          question: "Lorem ipsum dolor sit amet",
          answer:
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        },
      ],
      statuses : [false,false,false,false,false,false],
    };
    this.changeAllCollapse = this.changeAllCollapse.bind(this);
  }
  changeAllCollapse(key, value) {
    this.setState((state) => {
      const statuses = state.statuses.map((item, j) => {
        if (j === key) {
          return value;
        } else {
          return false;
        }
      });
      return {
        statuses,
      };
    });
  }
  public render(): React.ReactElement<IHowdoiProps> {
    return (
      <div className={styles.howdoi}>
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
                isOpenCollapse={this.state.statuses[index]}
              ></Collapse>
            );
          })}
        </div>
        <Viewmore></Viewmore>
      </div>

    );
  }
}
