import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Viewmore from "../Viewmore/Viewmore";

export default class Events extends React.Component {
  constructor(props) {
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
  render() {
    return (
      <div>
        <div className="event-grid-container">
          {this.state.events.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div className="event-grid-item">
                  <p className="event-day">{item.day}</p>
                  <p className="event-month">{item.month}</p>
                </div>
                <div className="event-grid-item">
                  <p className="post-title">{item.title}</p>

                  <div className="thumb-title">
                    <img className="thumb-img" src={Image.clock} />
                    <p className="post-time">
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
