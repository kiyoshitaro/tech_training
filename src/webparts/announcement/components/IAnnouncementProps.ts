import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAnnouncementProps {
  description: string;
  spContext: WebPartContext;
  listName: string;

}

export interface IAnnouncementStates{
  posts:  {
    title: string;
    content: string;
    time: string;
    tags: string[];
    img: string;
  }[];
}