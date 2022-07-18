import { LightningElement } from "lwc";

export default class FolderView extends LightningElement {


  menuOption = 'folders';

  get displayFolderMenu() {
    return this.menuOption === "folders";
  }

  get displayCreateMenu() {
    return this.menuOption === "create";
  }

  get displayImanageMenu() {
    return this.menuOption === "imanage";
  }

  get displayWorkspaceLink() {
    return this.menuOption === "workspace";
  }

  handleMenuSelect(event) {
    this.menuOption = event.detail.name;
  }
}
