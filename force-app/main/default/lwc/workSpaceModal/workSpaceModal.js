import { LightningElement } from "lwc";

export default class WorkSpaceModal extends LightningElement {
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
