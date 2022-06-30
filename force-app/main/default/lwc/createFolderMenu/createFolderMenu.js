import { LightningElement, api, wire } from "lwc";
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

const NAME_FIELD = 'Zudoc_Folder__c.Name';
const FOLDER_ID = 'Zudoc_Folder__c.Id';
const folderFields = [
  NAME_FIELD,
  FOLDER_ID,
];
export default class CreateFolderMenu extends LightningElement {
  folders;
  myRecordId;
  name;

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files;
    // eslint-disable-next-line no-alert
    alert("No. of files uploaded : " + uploadedFiles.length);
  }

  value = "inProgress";

  get options() {
    return [
      { label: "Correspondence", value: "correspondence" },
      { label: "Expenses", value: "expenses" },
      { label: "Incident Information", value: "incident" },
      { label: "Settlement", value: "settle" }
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
  }
}
