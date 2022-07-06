import { LightningElement } from "lwc";

export default class WorkSpaceLink extends LightningElement {
  clickedButtonLabel;

  showModal = false;
  handleClick() {
    this.showModal = true;
  }

  // @api show() {
  //     this.showModal = true;
  // }
  handleDialogClose() {
    this.showModal = false;
  }
}
