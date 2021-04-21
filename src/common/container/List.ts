import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {IList, IListInfo, sp, SPHttpClient} from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class List{
    private _listTitle: string;
    constructor(title:string){
        this._listTitle = title;
    } 
    public async getList(){


        return await sp.web.lists.getByTitle(this._listTitle).get();
    }

    public async getItemWithPage(num:number){
        return await sp.web.lists.getByTitle(this._listTitle).items.top(num).getPaged();
    }

    // public getMaxId():Promise<number>{
    //     let maxId:number ;
    //     return new Promise<number>((resolve)=>{
    //         sp.web.lists.getByTitle("Announcement").items.orderBy("Id", false).top(1).select("Id").get().then(res => {
    //             if(res.length > 0 ){
    //                 maxId = res[0].Id;
    //                 resolve(maxId);
    //             }
    //         })

    //     })
    // }
    // public getItemUsingRestApi( url: string, context:WebPartContext):Promise<IListItem[]>{
    //    const pageNum:number = 500;
    //    var finalRes: IListItem[] = [];
    //    return new Promise<IListItem[]>(async (resolve, reject) =>{
    //        this.getMaxId().then(listMaxId=>{
    //            for(var i=0; i< Math.ceil(listMaxId/pageNum); i++){
    //                var minId = i*pageNum;
    //                var maxId = (i+1)*pageNum;
    //                this.getListItemForEachIterRestApiWithFilter(url,this._listTitle,pageNum,context, i,minId,maxId)
    //                .then(results =>{
    //                    results.map(res=>{
    //                        finalRes.push({})
    //                    });
    //                });
    //            }
    //        });
    //        resolve(finalRes);
    //    });
    // }
    // public getListItemForEachIterRestApiWithFilter(url:string, listName: string, pageNum:number,context:WebPartContext, index: number,minId: number,maxId:number):Promise<any[]>{
    //     var eachIterRes: IListItem[] = [];
    //     let restapiUrl = url + `/_api/web/lists/GetByTitle('`+ listName +`')/items/?$skiptoken=Paged=True%26_ID=`+(index*pageNum +1)+`&$top=`+ pageNum + `&$select=`;
    //     return new Promise<IListItem[]>(async (resolve,reject) => {
    //         context.spHttpClient.get(restapiUrl,SPHttpClient.configurations.v1)
    //         .then((response: SPHttpClientResponse)=>{
    //             response.json().then(responseJson =>{
    //                 console.log(responseJson);
    //                 resolve(responseJson.value);

    //             })
    //         })
    //     })
    // }
    public async getItems(){
        let a = sp.web.lists.getByTitle(this._listTitle).items.top(2).getPaged().then(ls=> console.log(ls));
        
        return await sp.web.lists.getByTitle(this._listTitle).items.get(); 
    }
}