import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface INewsProps {
  description: string;
  spContext: WebPartContext;
  listName: string;
  postPerPage: number;

}
export interface INewsStates {
  posts:  {
    id: number;
    title: string;
    content: string;
    time: string;
    tags: string[];
    img: string;
  }[];
  currPage: number;
  maxPage: number;
  dataLoader: any;
}