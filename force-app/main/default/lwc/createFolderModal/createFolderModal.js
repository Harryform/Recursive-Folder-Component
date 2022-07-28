import { LightningElement, api, track } from 'lwc';

export default class CreateFolderModal extends LightningElement {
  @api newFolderName;
  @api myRecordId;
  @track newFolderName;
  @track parentFolder;

  get modalClasses() {
    const classes = ["slds-modal"];
    classes.push("slds-fade-in-open");
    return classes.join(" ");
  }

  get backdropClasses() {
    const classes = ["slds-backdrop"];
    classes.push("slds-backdrop_open");
    return classes.join(" ");
  }

  handleDialogClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  buttonSave() {
    this.dispatchEvent(new CustomEvent("save"));
  }
}