declare interface INewsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
}

declare module 'NewsWebPartStrings' {
  const strings: INewsWebPartStrings;
  export = strings;
}
