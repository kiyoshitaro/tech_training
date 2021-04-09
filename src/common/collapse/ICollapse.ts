export interface ICollapseProps {
  isOpenCollapse: boolean;
  id: number;
  item:{question:string,answer:string};
  changeAllCollapse:{(key:number,value: boolean):void;};
  }
  
  export interface ICollapseStates{
    titleClass: string;
    contentClass: string;
  }