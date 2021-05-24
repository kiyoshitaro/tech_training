import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IQuicklinksProps {
  description: string;
  spContext: WebPartContext;
  listName: string;
  
}

export interface IQuicklinksStates{
  links: {
    icon: string;
    link: string;
    title: string;
  }[];
}