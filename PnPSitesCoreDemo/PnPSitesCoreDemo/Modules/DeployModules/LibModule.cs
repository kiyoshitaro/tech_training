using System;
using System.Collections.Generic;
using System.Linq;
using OfficeDevPnP.Core.Pages;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.SharePoint.Client;
using System.IO;
namespace PnPSitesCoreDemo.Modules.DeployModules
{
    public class Library
    {

        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "Folder")]
        public List<DFolder> Folders { set; get; }

    }
    public class DFolder
    {
        [XmlAttribute(AttributeName = "Title")]
        public string Title { get; set; }

        [XmlElement(ElementName = "File")]
        public List<DFile> Files { set; get; }

        [XmlElement(ElementName = "Folder")]
        public List<DFolder> Folders { set; get; }


    }
    public class DFile
    {
        [XmlAttribute(AttributeName = "Path")]
        public string Path { get; set; }

    }
    public class LibModule: IDeployModule
    {

        private void CreateItemInFolder(DFolder FolderConfig, List LibObject, ClientContext context, string PrevFolderTitleConfig)
        {
            string FolderTitleConfig = FolderConfig.Title;
            try
            {
                ListItemCreationInformation FolderObject = new ListItemCreationInformation();
                FolderObject.UnderlyingObjectType = FileSystemObjectType.Folder;

                //context.Load(LibObject.RootFolder);
                //context.ExecuteQuery();
                //FolderObject.FolderUrl = LibObject.RootFolder.ServerRelativeUrl + "/" + PrevFolderTitleConfig;
                FolderObject.LeafName = FolderTitleConfig;

                ListItem newItem = LibObject.AddItem(FolderObject);
                newItem["Title"] = FolderTitleConfig;
                newItem.Update();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception {ex.Message} when creating {FolderTitleConfig} folder in {PrevFolderTitleConfig}");

            }
            List<DFile> FilesConfig = FolderConfig.Files;
            for (int k = 0; k < FilesConfig.Count; k++)
            {
                try
                {
                    DFile FileConfig = FilesConfig[k];

                    FileCreationInformation FileObject = new FileCreationInformation();

                    string FilePath = Path.Combine(this.rootAsset, FileConfig.Path);
                    FileObject.Content = System.IO.File.ReadAllBytes(@FilePath);

                    string[] filePath = FilePath.Split('\\');
                    string fileName = filePath[filePath.Length - 1];
                    FileObject.Url = @fileName;

                    Folder fo = LibObject.RootFolder.Folders.GetByUrl(FolderTitleConfig);
                    var uploadFile = fo.Files.Add(FileObject);

                    context.Load(LibObject);
                    context.Load(uploadFile);
                    context.ExecuteQuery();
                    Console.WriteLine($"-------Uploaded {fileName} in folder {FolderTitleConfig}--------");

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception {ex.Message} when pushing {FolderTitleConfig}");
                }
            }

            List<DFolder> FolsConfig = FolderConfig.Folders;
            foreach (DFolder FolConfig in FolsConfig)
            {
                this.CreateItemInFolder(FolConfig, LibObject, context, FolderTitleConfig);
            }
            Console.WriteLine($"--------------");


        }

        [XmlElement(ElementName = "Library")]
        public List<Library> LibsConfig { get; set; }

        [XmlAttribute(AttributeName = "rootAsset")]
        public string rootAsset { get; set; }


        public void Deploy(ClientContext context)
        {

            Console.WriteLine($"-----------------------------------------------");
            Console.WriteLine($"-----Deploying Library-----");
            for (int i = 0; i < this.LibsConfig.Count; i++)
            {
                Library LibConfig = this.LibsConfig[i];
                string LibTitleConfig = LibConfig.Title;

                List LibObject;

                //DELETE LIB

                if (context.Web.ListExists(LibTitleConfig))
                {
                    Console.WriteLine($"------{LibTitleConfig} existed, deleting------");

                    try
                    {
                        List oList = context.Web.Lists.GetByTitle(LibTitleConfig);
                        oList.DeleteObject();
                        context.ExecuteQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Exception {ex.Message} when deleting {LibTitleConfig}");
                    }

                }

                //CREATE LIB
                Console.WriteLine($"--------Creating {LibTitleConfig} lib--------");
                try
                {
                    ListCreationInformation libCreationInfo = new ListCreationInformation();
                    libCreationInfo.Title = LibTitleConfig;
                    libCreationInfo.TemplateType = (int)ListTemplateType.DocumentLibrary;
                    context.Web.Lists.Add(libCreationInfo);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception {ex.Message} when creating {LibTitleConfig} list");
                }


                //ADD FOLDER
                LibObject = context.Web.Lists.GetByTitle(LibTitleConfig);
                LibObject.EnableFolderCreation = true;
                List<DFolder> FoldersConfig = LibConfig.Folders;

                for (int j = 0; j < FoldersConfig.Count; j++)
                {
                    DFolder FolderConfig = FoldersConfig[j];
                    this.CreateItemInFolder(FolderConfig, LibObject, context, LibTitleConfig);
                }
                context.ExecuteQuery();
                Console.WriteLine($"--------Created {LibTitleConfig} lib--------");
            }
            Console.WriteLine($"-----------------------------------------------");

        }
    }
}
