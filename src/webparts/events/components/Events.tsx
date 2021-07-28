import * as React from "react";
import styles from "./Events.module.scss";
import { IEventsProps, IEventsStates } from "./IEventsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Image from "../../../assets/Image.jsx";
import Viewmore from "../../../common/viewmore/Viewmore";

import { sp } from "@pnp/sp/presets/all";
import { List } from "../../../common/container/List";

export default class Events extends React.Component<
  IEventsProps,
  IEventsStates
> {
  private _listService;

  constructor(props: IEventsProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spContext });
    this._listService = new List("Events");

    this.state = {
      events: [],
    };
  }

  private _convert_time(time) {
    // 2021-03-29T09:30:00Z
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let mnts = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + mnts + " " + ampm;
  }
  private _process_data(item) {
    // debugger;

    let startTime = new Date(item.EventDate.replace("Z", "").replace("T", " "));
    let endTime = new Date(item.EndDate.replace("Z", "").replace("T", " "));
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      title: item.Title,
      day: startTime.getDate(),
      month: monthNames[startTime.getMonth()],
      start: this._convert_time(startTime),
      end: this._convert_time(endTime),
    };
  }
  public componentDidMount() {
    this._listService
      .getItems()
      .then((list) => {
        // debugger;
        this.setState({
          events: list.map((item) => {
            return { ...this._process_data(item) };
          }),
        });
      })
      .catch(() => {
        this.setState({ events: [] });
      });
  }

  public render(): React.ReactElement<IEventsProps> {
    return (
      <div>
        <p className={styles.topic}>Events</p>

        <div className={styles.eventGridContainer}>
          {this.state.events &&
            this.state.events.map((item, index) => {
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
        <Viewmore url="https://vndevcore.sharepoint.com/sites/brown/Lists/Events/calendar.aspx"></Viewmore>
      </div>
    );
  }
}
