import * as React from 'react';

import styles from './Viewmore.module.scss';
import { IViewmoreProps, IViewmoreStates } from './IViewmore';
import Image from "../../assets/Image.jsx";


export default class Viewmore extends React.Component<IViewmoreProps, IViewmoreStates> {
    constructor(props : IViewmoreProps) {
    super(props);
  }
  public render(): React.ReactElement<IViewmoreProps> {
    return (
      <a className={`${styles.thumbTitle}, ${styles.viewmore}`}  href="#">
        <span className={styles.text}>View more</span>
        <img className={styles.thumbImg} src={Image.arrowicon} />
      </a>
    );
  }
}
