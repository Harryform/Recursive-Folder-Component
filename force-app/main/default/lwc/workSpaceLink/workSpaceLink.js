/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class WorkSpaceLink extends LightningElement {
  saveModal = false;
  showModal = false;
  workSpaceName;

  // Workspace button
  handleClick() {
    this.showModal = true;
  }

  // Close button for Workspace
  buttonClose() {
    this.showModal = false;
  }

  // Save button for Workspace
  buttonSave() {
    this.showModal = false;
    this.saveModal = true;
    setTimeout(() => {
      this.saveModal = false;
      const event = new ShowToastEvent({
        title: "Success",
        message: "Workspace was successfully created",
        variant: "success"
      });
      this.dispatchEvent(event);
    }, 3000);
    [...this.template
      .querySelectorAll('lightning-input, lightning-textarea')]
      .forEach((input) => { input.value = ''; });
  }

  // Name change for Workspace
  handleNameChange({ detail }) {
    this.workSpaceName = detail.value;
  }
}
