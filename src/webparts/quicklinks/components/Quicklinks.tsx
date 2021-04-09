import * as React from 'react';
import styles from './Quicklinks.module.scss';
import { IQuicklinksProps, IQuicklinksStates } from './IQuicklinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Image from "../../../assets/Image.jsx";

export default class Quicklink extends React.Component<IQuicklinksProps, IQuicklinksStates> {

  constructor(props: IQuicklinksProps) {
    super(props);
    this.state = {
      links: [
        { icon: Image.icon, link: "#", title: "Training" },
        { icon: Image.icon_1, link: "#", title: "Organization" },
        { icon: Image.icon_2, link: "#", title: "Task" },
        { icon: Image.icon_3, link: "#", title: "Global Sales" },
        { icon: Image.icon_4, link: "#", title: "Birthday" },
        { icon: Image.icon_5, link: "#", title: "Health" },
        { icon: Image.icon_6, link: "#", title: "Service Desk" },
        { icon: Image.icon_7, link: "#", title: "Truck" },
        { icon: Image.icon_8, link: "#", title: "Idea" },
      ],
    };  }


  public render(): React.ReactElement<IQuicklinksProps> {
    // console.log(typeof Image.icon );
    return (
      <div className={styles.quicklinkGridContainer}>
        {this.state.links.map((item, index) => {
          return (
            <a className={styles.quicklinkGridItem} key={index} href={item.link}>
              <img src={item.icon}></img>
              <p className={styles.linkTitle}>{item.title}</p>
            </a>
          );
        })}
      </div>
    );
  }
}
