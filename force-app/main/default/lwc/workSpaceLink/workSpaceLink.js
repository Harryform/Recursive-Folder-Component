import { LightningElement } from "lwc";

export default class ButtonBasic extends LightningElement {
  clickedButtonLabel;

  handleClick(event) {
    this.previewModal = event.target.label;
  }
  showModal = false;

  // @api show() {
  //     this.showModal = true;
  // }
  handleDialogClose() {
    this.showModal = false;
  }
}
