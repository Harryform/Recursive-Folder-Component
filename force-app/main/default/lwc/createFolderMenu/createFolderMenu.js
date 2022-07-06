import { LightningElement, api, wire, track } from "lwc";
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';

export default class CreateFolderMenu extends LightningElement {
  folders;
  myRecordId;
  name;

  @wire(getFolderRecords)
  gettingOptionsArray({ error, data }) {
    if (data) {
      this.folders = data;
      for(let i=0; i<data.length; i++) {
        if (data[i].Zudoc_Parent_Folder__c != null) {
          this.items = [...this.items, {value: data[i].Id, label: data[i].Name} ];
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
    alert("No. of files uploaded : " + uploadedFiles.length);
  }

  @track items = [];
  myRecordId = '';

  get folderOptions() {
    return this.items;
  }

  handleChange(event) {
    this.myRecordId = event.detail.value;
  }
}
