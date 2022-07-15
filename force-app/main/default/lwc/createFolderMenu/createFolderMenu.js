import { LightningElement, wire, track } from "lwc";
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';

export default class CreateFolderMenu extends LightningElement {
  folders;
  myRecordId;
  myParentId;

  @wire(getFolderRecords)
  gettingOptionsArray({data, error}) {
    if(data){
      this.folders = data;
      let folderId = '';
      let folderName = '';
      let parent = '';
      let folder = '';
      for(folder in data){
        folderId = data[folder]['Id'];
        folderName = data[folder]['Name'];
        parent = data[folder]['Zudoc_Parent_Folder__c'];
        this.allItems = [...this.allItems, {value: folderId, label: folderName} ];
        if(parent != undefined){
          this.items = [...this.items, {value: folderId, label: folderName} ];
        }
      }
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.folders = undefined;
    }
  }

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    alert("Your file has been uploaded");
  }

  @track items = [];
  @track allItems = [];
  myRecordId = '';
  myParentId = '';

  get folderOptions() {
    return this.items;
  }

  get parentOptions(){
    return this.allItems;
  }

  handleChange(event) {
    this.myRecordId = event.detail.value;
  }

  handleParent(event){
    this.myParentId = event.detail.value;
  }
}
