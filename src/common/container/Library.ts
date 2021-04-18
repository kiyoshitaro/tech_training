import "@pnp/sp/webs";
// import "@pnp/sp/folders";
import "@pnp/sp/files";
import Image from "../../assets/Image.jsx";

import { IFolders, IList, IListInfo, sp } from "@pnp/sp/presets/all";


let icons = {
    docx : Image.word,
    pptx: Image.powerpoint,
    xlsx: Image.word,
}
export class Library {

    private _libTitle: string;
    constructor(title:string){
        this._libTitle = title;
    } 
    public async getFileByTopic(topic:string){
        // return await sp.web.getFolderByServerRelativePath("/sites/brown/Shared Documents").listItemAllFields();
        return await sp.web.folders.getByName(this._libTitle).folders.getByName(topic).files.get();
        // return await sp.web.rootFolder.folders.getByName("document").folders();

    }
    public async getAllTopic(){
        // return await sp.web.folders.getByName(this._libTitle).folders.getByName(doc.Name).files();
        // return await this.getFileByTopic(doc.Name);
        return await sp.web.folders.getByName(this._libTitle).folders.get();
    }
    // public getAllFile(){
    //     let data = [];
    //     this.getAllTopic().then(
    //         (_allTopic)=>{
    //             _allTopic.map((doc)=> {
    //                 this.getFileByTopic(doc.Name).then((allFile)=>{
    //                     data = [...data, {
    //                         topic:doc.Name,
    //                         docs: allFile.map((file)=>{
    //                             let ext:string = file.Name.split('.')[file.Name.split('.').length-1];
    //                             return {
    //                                 title: file.Name,
    //                                 icon: icons[ext],
    //                                 url: file.LinkingUrl,
    //                             }}
    //                         )}  
    //                     ]
    //                 })
                    
    //             });
    //         }
    //     );
    //     return data

    // }


    
}
