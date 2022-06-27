import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class FolderList extends NavigationMixin(LightningElement) {
  folders;

  handleFolderView(event) {
    const folderId = event.detail;
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: folderId,
        objectApiName: 'Zudoc_Folder__c',
        actionName: 'view',
      },
    });
  }
}