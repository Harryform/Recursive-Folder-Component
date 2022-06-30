import { LightningElement, api, wire, track } from "lwc";
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

const NAME_FIELD = 'Zudoc_Folder__c.Name';
const FOLDER_ID = 'Zudoc_Folder__c.Id';
const folderFields = [
  NAME_FIELD,
  FOLDER_ID,
];
let i=0;
export default class CreateFolderMenu extends NavigationMixin(LightningElement) {
  folders;
  myRecordId;
  name;
  
  @wire(getFolderRecords)
  loadFolders(result) {
    console.log(JSON.parse(JSON.stringify(result)));
    if (result.data) {
      this.folders = result.data;
    }
  }

  // Need to figure out how to not include "Root Folder"
  @wire(getFolderRecords)
  gettingOptionsArray({ error, data }) {
    if (data) {
      for(i=0; i<data.length; i++) {
        this.items = [...this.items, {value: data[i].Id, label: data[i].Name} ];
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
  @track value = '';
  @track chosenValue = '';

  value = "inProgress";

  get folderOptions() {
    return this.items;
  }

  handleChange(event) {
    const selectedOption = event.detail.value;
    this.chosenValue = selectedOption;
  }

  get selectedValue() {
    return this.chosenValue;
  }
}
