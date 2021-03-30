import React from "react";
import "./layout.css";
import Navigation from "../Components/Navigation/Navigation";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="portal-homepage">
                <div className="wrap">
                    <div className="header">
                        <Navigation></Navigation>
                    </div>
                    <div className="content">
                        <div id="announcement">

                        </div>
                        <div id="news">

                        </div>
                        <div id="image-gallery">

                        </div>
                        <div id="video-gallery">

                        </div>
                        <div id="document-gallery">

                        </div>
                        <div id="quick-links">

                        </div>
                        <div id="events">

                        </div>
                        <div id="how-do-i">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}