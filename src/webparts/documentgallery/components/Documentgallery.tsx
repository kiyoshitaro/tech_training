import * as React from "react";
import styles from "./Documentgallery.module.scss";
import {
  IDocumentgalleryProps,
  IDocumentgalleryStates,
} from "./IDocumentgalleryProps";
import Image from "../../../assets/Image.jsx";
import Viewmore from "../../../common/viewmore/Viewmore";

import { sp } from "@pnp/sp/presets/all";
import { Library } from "../../../common/container/Library";

export default class Documentgallery extends React.Component<
  IDocumentgalleryProps,
  IDocumentgalleryStates
> {
  private _libService;

  constructor(props: IDocumentgalleryProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spContext });
    this._libService = new Library("document");

    this.state = {
      documents: [],
    };
  }
  public componentDidMount() {
    let icons = {
      docx: Image.word,
      pptx: Image.powerpoint,
      xlsx: Image.word,
    };
    this._libService.getAllTopic().then((allTopic) => {
      allTopic
        .filter((tp) => tp.Name !== "Forms")
        .map((tp) => {
          this._libService.getFileByTopic(tp.Name).then((allFile) => {
            this.setState({
              documents: [
                ...this.state.documents,
                {
                  topic: tp.Name,
                  docs: allFile.map((file) => {
                    let ext: string = file.Name.split(".")[
                      file.Name.split(".").length - 1
                    ];
                    return {
                      title: file.Name,
                      icon: icons[ext],
                      url: file.LinkingUrl,
                    };
                  }),
                },
              ],
            });
          });
        });
    });
  }

  public render(): React.ReactElement<IDocumentgalleryProps> {
    return (
      <div>
        <p className={styles.topic}>Document Gallery</p>

        <div className={styles.documentGridContainer}>
          {this.state.documents &&
            this.state.documents.map((item, index) => {
              return (
                <div key={index} className={styles.documentGridItem}>
                  <p>{item.topic}</p>
                  {item.docs &&
                    item.docs.map((it, ind) => {
                      return (
                        <div className={styles.thumbTitle} key={ind}>
                          <img className={styles.thumbImg} src={it.icon} />
                          <a
                            className={styles.documentTitle}
                            // target="_blank"
                            href={it.url}
                          >
                            {it.title}
                          </a>
                        </div>
                      );
                    })}
                  <Viewmore></Viewmore>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
