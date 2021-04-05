import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";

export default class DocumentGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [
        {
          topic: "Policy",
          icon: Image.word,
          docs: [
            { title: "Policy 1" },
            { title: "Policy 2" },
            { title: "Policy 4" },
            { title: "Policy 6" },
          ],
        },
        {
          topic: "SOP",
          icon: Image.word,
          docs: [
            { title: "Demo Script" },
            { title: "App Introduction" },
            { title: "Index" },
            { title: "Training" },
          ],
        },

        {
          topic: "Corporate Template",
          icon: Image.word,

          docs: [
            { title: "Template 1" },
            { title: "Template 2" },
            { title: "Template 3" },
          ],
        },

        {
          topic: "Report",
          icon: Image.vsdx,
          docs: [
            { title: "Report 1" },
            { title: "Report 2" },
            { title: "Report 3" },
            { title: "Report 4" },
          ],
        },
        {
          topic: "Slider",
          icon: Image.powerpoint,
          docs: [
            { title: "Template 1" },
            { title: "Template 2" },
            { title: "Template 3" },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div className="document-grid-container">
        {this.state.documents.map((item, index) => {
          return (
            <div key={index} className="document-grid-item">
              <p>{item.topic}</p>
              {item.docs.map((it, ind) => {
                return (
                  <div className="thumb-title" key={ind}>
                    <img className="thumb-img" src={item.icon} />
                    <p className="doocument-title">{it.title}</p>
                  </div>
                );
              })}
              <a className="thumb-title viewmore" href="#">
                View more
                <img className="thumb-img" src={Image.arrowicon} />
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
