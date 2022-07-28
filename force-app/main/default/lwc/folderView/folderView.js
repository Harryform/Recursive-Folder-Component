import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';
import getFileRecords from '@salesforce/apex/FileController.getFileRecords';

export default class FolderView extends LightningElement {

  folders;
  name;
  root;
  folder;
  show = false;

  // Pulls Zudoc Folder data, gets Root Folder and calls recursive function
  @wire(getFolderRecords)
  folderData({data, error}){
    if(data){
      this.folders = data;
      let folder = '';
      let folderObject = '';
      let root = '';

      for(folder in data){
        folderObject = data[folder];
        const parentId = data[folder]['Zudoc_Parent_Folder__c'];
        if(parentId == undefined){
          root = folderObject;
          this.items = this.folderRecursion(root);
        }
      }
      this.error = undefined;
    } else if(error){
      this.error = error;
      this.folders = undefined;
    }
  }

  @track folderObject = '';
  @track root = '';
  @track myRecordId;

  // Recursive function to fill list of Items for lightning tree with Zudoc Folders
  folderRecursion(current) {
    let children = '';
    let child = '';
    let childId = '';

    if(current.Id == undefined){
      return;
    }
    children = current.Zudoc_Child_Folders__r;
    let items = [];
    for(child in children){
      child = children[child];
      childId = child.Id;
      parent = child.Zudoc_Parent_Folder__c;
      if(child != undefined){
        items.push(
          {
            id: child.Id,
            label: child.Name,
            name: child.Id,
            parentId: current.Id,
            expanded: false,
            items: this.folderRecursion(this.folders[child.Id])
          });
      }
    }
    return items;
  }

  @track items = [];

  // Matches files from fileStats to the selected record in lightning tree
  findCorrectFiles(fileStats){
    let object = '';
    let recordId = '';
    let folderId = '';
    let newObjectList = [];
    fileStats = this.fileStats;
    for(object in fileStats){
      object = fileStats[object];
      recordId = this.myRecordId;
      folderId = object.id;
      if(folderId === recordId){
        newObjectList.push(object);
      }
    }
    this.newObjectList = newObjectList;
    return newObjectList;
  }

  @track newObjectList = [];

  // Gives Id of selected Zudoc Folder in lightning tree
  handleSelect(event){
    let targetName = event.detail.name;
    this.show = false;
    this.show = true;
    this.myRecordId = targetName;
    this.findCorrectFiles();
  }

  // Gets all files related to Zudoc Folders
  @wire(getFileRecords)
  fileData({data, error}){
    if(data){
      this.files = data;
      let oneFile = '';
      let fileName = '';
      let createdDate = '';
      let modifiedDate = '';
      let fileSize = '';
      let fileType = '';
      let fileId = '';
      let oneFolder = '';
      let fileObject = '';
      let fileIcon = '';
      let fileStats = [];
      for(fileObject in data){
        oneFile = data[fileObject].ContentDocument;
        fileName = oneFile.Title;
        createdDate = oneFile.CreatedDate;
        modifiedDate = oneFile.ContentModifiedDate;
        fileSize = oneFile.ContentSize;
        fileType = oneFile.FileType;
        fileId = oneFile.Id;
        oneFolder = data[fileObject].LinkedEntityId;
        if(oneFile != undefined){
          if(fileType == 'PNG'){
            fileIcon = 'doctype:image';
          } else{
            fileIcon = 'doctype:pdf';
          }
          fileStats.push(
            {
              id: oneFolder,
              fileType: fileType,
              fileName: fileName,
              createdDate: createdDate,
              lastModified: modifiedDate,
              size: fileSize,
              trendIcon: fileIcon,
            }
          );
        }
      }
      this.fileStats = fileStats;
      this.error = undefined;
    } else if(error){
      this.files = undefined;
      this.error = error;
    }
  }

  @track fileStats = [];

  newFolderName;

  // Accepted formats for files being uploaded
  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  // Determines where files go when uploaded
  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    alert("Your file has been uploaded");
  }

  // Layout for columns in Files data table
  columns = [
    {   label: 'File Type',
        fieldName: 'fileType',
        type: 'text/icon',
        cellAttributes: {
          iconName: { fieldName: 'trendIcon' },
          iconPosition: 'left',
        },
     },
    {
        label: 'File Name',
        fieldName: 'fileName',
        type: 'text',
    },
    {
        label: 'Created Date',
        fieldName: 'createdDate',
        type: 'date',
        typeAttributes: { currencyCode: 'EUR', step: '0.001' },
    },
    { label: 'Last Modified Date', fieldName: 'lastModified', type: 'date' },
    { label: 'File Size', fieldName: 'size', type: 'text' },
  ];
}
