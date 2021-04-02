import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

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
        {this.state.events.map((item, index) => {
          return (
            <div key={index} className="container">
              <div className="item-1">
                <p className="event-day">{item.day}</p>
                <p className="event-month">{item.month}</p>
              </div>
              <div className="item-2">
                <p className="post-title">{item.title}</p>

                <p className="post-time">
                  <img className="img_thumbnail" src={Image.date} />
                  {item.start} - {item.end}
                </p>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}
