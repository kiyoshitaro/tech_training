import React from "react";
import "./layout.css";
import Navigation from "../Components/Navigation/Navigation";
import Announcement from "../Components/Announcement/Announcement";
import News from "../Components/News/News";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="portal-homepage">
        <div className="wrap">
          <div className="header">
            <Navigation></Navigation>
          </div>
          <div className="content">
            <div class="row">
              <div class="leftcolumn">
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

              <div class="rightcolumn">
                <div id="quick-links"></div>
                <div id="events"></div>
                <div id="how-do-i"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
