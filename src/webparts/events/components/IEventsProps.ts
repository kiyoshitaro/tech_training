export interface IEventsProps {
  description: string;
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