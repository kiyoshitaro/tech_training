export interface INewsProps {
  description: string;
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