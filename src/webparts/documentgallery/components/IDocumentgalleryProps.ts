export interface IDocumentgalleryProps {
  description: string;
}

export interface IDocumentgalleryStates{
  documents: {
    topic: string;
    icon: string;
    docs: {
      title: string;
    }[];
  }[];
}