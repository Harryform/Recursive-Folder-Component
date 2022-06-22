import { LightningElement } from 'lwc';

export default class FolderView extends LightningElement {
  menuOption = 'folder';

  get displayFolderMenu() {
    return this.menuOption === 'folder';
  }

  get displayCreateMenu() {
    return this.menuOption === 'create';
  }

  get displayImanageMenu() {
    return this.menuOption === 'imanage';
  }

  handleMenuSelect(event) {
    this.menuOption = event.detail.name;
  }
}