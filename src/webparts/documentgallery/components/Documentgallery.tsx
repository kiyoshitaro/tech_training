import * as React from 'react';
import styles from './Documentgallery.module.scss';
import { IDocumentgalleryProps, IDocumentgalleryStates } from './IDocumentgalleryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Image from "../../../assets/Image.jsx";
import Viewmore from "../../../common/viewmore/Viewmore";

export default class Documentgallery extends React.Component<IDocumentgalleryProps,IDocumentgalleryStates > {
  constructor(props: IDocumentgalleryProps){
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
    }
  }

  public render(): React.ReactElement<IDocumentgalleryProps> {
    return (
      <div className={styles.documentGridContainer}>
        {this.state.documents.map((item, index) => {
          return (
            <div key={index} className={styles.documentGridItem}>
              <p>{item.topic}</p>
              {item.docs.map((it, ind) => {
                return (
                  <div className={styles.thumbTitle} key={ind}>
                    <img className={styles.thumbImg} src={item.icon} />
                    <p className={styles.documentTitle}>{it.title}</p>
                  </div>
                );
              })}
              <Viewmore></Viewmore>
            </div>
          );
        })}
      </div>
    );
  }
}
