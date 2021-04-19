import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface INewsProps {
  description: string;
  spContext: WebPartContext;
}
export interface INewsStates {
  posts:  {
    title: string;
    content: string;
    time: string;
    tags: string[];
    img: string;
  }[];
}