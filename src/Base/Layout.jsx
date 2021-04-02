import React from "react";
import "./layout.css";
import Navigation from "../Components/Navigation/Navigation";
import Announcement from "../Components/Announcement/Announcement";
import News from "../Components/News/News";
import QuickLinks from "../Components/QuickLinks/QuickLinks";
import Events from "../Components/Events/Events";
import HowDoI from "../Components/HowDoI/HowDoI";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="portal-homepage">
        <div className="wrap">
          <div className="header">
            <Navigation></Navigation>
          </div>
          <div className="content">
            <div className="row">
              <div className="leftcolumn">
                <div id="announcement">
                  <p className="topic">Announcement</p>
                  <Announcement></Announcement>
                  <a className="viewmore">View more</a>
                </div>

                <div id="news">
                  <p className="topic">News</p>
                  <News></News>
                  <a className="viewmore">View more</a>
                </div>

                <div id="image-gallery"></div>
                <div id="video-gallery"></div>
                <div id="document-gallery"></div>
              </div>

              <div className="rightcolumn">
                <div id="quick-links">
                  <p className="topic">Quick Links</p>
                  <QuickLinks></QuickLinks>
                </div>
                <div id="events">
                  <p className="topic">Events</p>
                  <Events></Events>
                  <a className="viewmore">View more</a>
                </div>
                <div id="how-do-i">
                  <p className="topic">How do I</p>
                  <HowDoI></HowDoI>
                  <a className="viewmore">View more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
