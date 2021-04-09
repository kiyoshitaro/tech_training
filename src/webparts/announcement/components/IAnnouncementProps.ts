export interface IAnnouncementProps {
  description: string;
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