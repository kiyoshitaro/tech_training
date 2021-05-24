import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHowdoiProps {
  description: string;
  spContext: WebPartContext;
  listName: string;
}
export interface IHowdoiStates{
  faq: {question:string;answer:string, status: boolean}[];
}
