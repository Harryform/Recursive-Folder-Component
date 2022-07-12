import { LightningElement } from "lwc";

export default class WorkSpaceLink extends LightningElement {
  clickedButtonLabel;

  showModal = false;
  handleClick() {
    this.showModal = true;
  }

  buttonClose() {
    this.showModal = false;
  }

  buttonSave() {
    this.showModal = false;
  }
}
