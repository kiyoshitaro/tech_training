import * as React from 'react';
import styles from './Events.module.scss';
import { IEventsProps,IEventsStates } from './IEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Image from "../../../assets/Image.jsx";
import Viewmore from "../../../common/viewmore/Viewmore";

export default class Events extends React.Component<IEventsProps,  IEventsStates> {

  
  constructor(props: IEventsProps) {
    super(props); 
    this.state = {
      events: [
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
        {
          day: "01",
          month: "Jan",
          title: "IT maintainance",
          start: "09:00 AM",
          end: "09:30 AM",
        },
      ],
    };
}

  public render(): React.ReactElement<IEventsProps> {
    return (
      <div>
        <div className={styles.eventGridContainer}>
          {this.state.events.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div className={styles.eventGridItem}>
                  <p className={styles.eventDay}>{item.day}</p>
                  <p className={styles.eventMonth}>{item.month}</p>
                </div>
                <div className={styles.eventGridItem}>
                  <p className={styles.postTitle}>{item.title}</p>

                  <div className={styles.thumbTitle}>
                    <img className={styles.thumbImg} src={Image.clock} />
                    <p className={styles.postTime}>
                      {item.start} - {item.end}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <Viewmore></Viewmore>
      </div>

    );
  }
}
