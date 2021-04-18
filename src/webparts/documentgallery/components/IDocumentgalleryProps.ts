import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentgalleryProps {
  description: string;
  spContext: WebPartContext;
}

export interface IDocumentgalleryStates{
  documents: {
    topic: string;
    docs: {
      title: string;
      icon: string;
      url: string;
    }[];
  }[];
}