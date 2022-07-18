/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class WorkSpaceLink extends LightningElement {
  saveModal = false;
  showModal = false;
  workSpaceName;

  handleClick() {
    this.showModal = true;
  }

  buttonClose() {
    this.showModal = false;
  }

  buttonSave() {
    this.showModal = false;
    this.saveModal = true;
    setTimeout(() => {
      this.saveModal = false;
      const event = new ShowToastEvent({
        title: "Success",
        message: "Workspace was successfully create",
        variant: "success"
      });
      this.dispatchEvent(event);
    }, 3000);
  }

  handleNameChange({ detail }) {
    this.workSpaceName = detail.value;
  }
}
