import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEventsProps {
  description: string;
  spContext: WebPartContext;
}

export interface IEventsStates{
  events:{
    day: string;
    month: string;
    title: string;
    start: string;
    end: string;
  }[];
}