import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import submitNewFolder from '@salesforce/apex/FolderController.submitNewFolder';

export default class CreateFolderMenu extends LightningElement {
  saveModal = false;
  showModal = false;
  @api myRecordId;
  newFolderName;
  newFolderId;
  @track folderName;
  @track parentFolder;
  @track result;
  @track newFolderId;

  // New folder button
  handleClick() {
    this.showModal = true;
  }

  // Close button for new folder
  buttonClose() {
    this.showModal = false;
  }

  buttonSave() {
    this.showModal = false;
    this.saveModal = true;
    console.log('BEFORE APEX CLASS', this.myRecordId);
    submitNewFolder({folderName:this.newFolderName, parentFolder:this.myRecordId})
    .then(result => {
      this.newFolderId = result.Id;
      this.newFolderParent = result.Zudoc_Parent_Folder__c;
      console.log('New Folder Id', this.newFolderId);
      console.log('NEW PARENT ID', this.newFolderParent);
      setTimeout(() => {
        this.saveModal = false;
        const event = new ShowToastEvent({
          title: "Success",
          message: "Your new Zudoc Folder was successfully created",
          variant: "success"
        });
        this.dispatchEvent(event);
      }, 3000);
      [...this.template
        .querySelectorAll('lightning-input, lightning-textarea')]
        .forEach((input) => { input.value = ''; });
    })
  }

  handleNameChange({ detail }) {
    this.newFolderName = detail.value;
  }
}
