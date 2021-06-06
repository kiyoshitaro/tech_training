import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import Viewmore from "../Viewmore/Viewmore";

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], loading: true };
    this.process_data = this.process_data.bind(this);
    this.convert_time = this.convert_time.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const response = await fetch("event");
    const data = await response.json();
    // debugger;
    this.setState({
      events: data.map((event) => this.process_data(event)),
      loading: false,
    });
  }
  process_data(item) {
    // debugger;

    let startTime = new Date(item.eventDate.replace("Z", "").replace("T", " "));
    let endTime = new Date(item.endDate.replace("Z", "").replace("T", " "));
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
      title: item.title,
      day: startTime.getDate(),
      month: monthNames[startTime.getMonth()],
      start: this.convert_time(startTime),
      end: this.convert_time(endTime),
    };
  }
  convert_time(time) {
    // 2021-03-29T09:30:00Z
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let mnts = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + mnts + " " + ampm;
  }

  render() {
    return this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
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
