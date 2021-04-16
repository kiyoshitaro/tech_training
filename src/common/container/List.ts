import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {IList, IListInfo, sp} from "@pnp/sp/presets/all";

export class List{
    private _context : any;
    private _listTitle: string;
    constructor(title:string){
        this._listTitle = title;
    } 
    public async getList(){
        return await sp.web.lists.getByTitle(this._listTitle).get();
    }
    public async getItems(){
        return await sp.web.lists.getByTitle(this._listTitle).items.get(); 
    }
}