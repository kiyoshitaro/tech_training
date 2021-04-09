export interface IQuicklinksProps {
  description: string;
}

export interface IQuicklinksStates{
  links: {
    icon: string;
    link: string;
    title: string;
  }[];
}