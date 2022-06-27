import { LightningElement, wire } from 'lwc';
import FOLDER_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/FolderListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import searchFolderRecords from '@salesforce/apex/FolderController.searchFolderRecords';

export default class FolderList extends NavigationMixin(LightningElement) {
  searchTerm = '';
  folders;
@wire(MessageContext) messageContext;
@wire(searchFolderRecords, {searchTerm: '$searchTerm'})
loadFolders(result) {
  this.folders = result;
  if (result.data) {
    const message = {
      folders: result.data
    };
    publish(this.messageContext, FOLDER_LIST_UPDATE_MESSAGE, message);
  }
}
  handleSearchTermChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchTerm = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchTerm = searchTerm;
    }, 300);
  }
  get hasResults() {
    return (this.folders.data.length > 0);
  }
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