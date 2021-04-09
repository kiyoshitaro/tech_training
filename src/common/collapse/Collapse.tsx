import * as React from 'react';

import styles from './Collapse.module.scss';
import { ICollapseProps, ICollapseStates } from './ICollapse';
import Image from "../../assets/Image";


export default class Viewmore extends React.Component<ICollapseProps, ICollapseStates> {
    constructor(props : ICollapseProps) {
    super(props);
    this.state = {
      // isOpenCollapse: props.isOpenCollapse,
      titleClass: styles.titleCollapse,
      contentClass: `${styles.contentCollapse} ${styles.contentCollapseClose}`,
    };
    this.setClassCollapse = this.setClassCollapse.bind(this);

  }
  setClassCollapse() {
    if (this.props.isOpenCollapse) {
      this.setState({
        titleClass: `${styles.titleCollapse} active`,
        contentClass: `${styles.contentCollapse} ${styles.contentCollapseOpen}`,
      });
    } else {
      this.setState({
        titleClass: styles.titleCollapse,
        contentClass: `${styles.contentCollapse} ${styles.contentCollapseClose}`,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpenCollapse !== prevProps.isOpenCollapse) {
      this.setClassCollapse();
    }
  }
  public render(): React.ReactElement<ICollapseProps> {
    return (
      <div>
        <button
          className={this.state.titleClass}
          onClick={() =>
            this.props.changeAllCollapse(
              this.props.id,
              !this.props.isOpenCollapse
            )
          }
        >
          <img
            className={styles.thumbImg}
            src={this.props.isOpenCollapse ? Image.expand : Image.collapse}
          />
          <span>{this.props.item.question}</span>
        </button>
        <div className={this.state.contentClass}>
          A: {this.props.item.answer}
        </div>
      </div>
    );
  }
}
