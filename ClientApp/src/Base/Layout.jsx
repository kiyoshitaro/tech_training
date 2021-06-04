import React from "react";
import "./layout.css";
import Navigation from "../Components/Navigation/Navigation";
import Announcement from "../Components/Announcement/Announcement";
import News from "../Components/News/News";
import QuickLinks from "../Components/QuickLinks/QuickLinks";
import Events from "../Components/Events/Events";
import HowDoI from "../Components/HowDoI/HowDoI";
import ImageGallery from "../Components/ImageGallery/ImageGallery";
import VideoGallery from "../Components/VideoGallery/VideoGallery";
import DocumentGallery from "../Components/DocumentGallery/DocumentGallery";
import Image from "./Image.jsx";

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
                </div>

                <div id="news">
                  <p className="topic">News</p>
                  <News></News>
                </div>

                <div id="image-gallery">
                  <p className="topic">Image Gallery</p>
                  <ImageGallery></ImageGallery>
                </div>
                <div id="video-gallery">
                  <p className="topic">Video Gallery</p>
                  <VideoGallery></VideoGallery>
                </div>
                <div id="document-gallery">
                  <p className="topic">Document Gallery</p>
                  <DocumentGallery></DocumentGallery>
                </div>
              </div>

              <div className="rightcolumn">
                <div id="quick-links">
                  <p className="topic">Quick Links</p>
                  <QuickLinks></QuickLinks>
                </div>
                <div id="events">
                  <p className="topic">Events</p>
                  <Events></Events>
                </div>
                <div id="how-do-i">
                  <p className="topic">How do I</p>
                  <HowDoI></HowDoI>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
