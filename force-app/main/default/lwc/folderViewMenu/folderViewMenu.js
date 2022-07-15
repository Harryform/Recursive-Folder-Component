import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';

export default class FolderViewMenu extends LightningElement {
  folders;
  myRecordId;
  name;
  root;

  @wire(getFolderRecords)
  folderData({data, error}){
    if(data){
      this.folders = data;
      let folder = '';
      let folderObject = '';
      let root = '';

      for(folder in data){
        folderObject = data[folder];
        const parentId = data[folder]['Zudoc_Parent_Folder__c'];
        if(parentId == undefined){
          root = folderObject;
          this.items = this.folderRecursion(root);
        }
      }
      this.error = undefined;
    } else if(error){
      this.error = error;
      this.folders = undefined;
    }
  }

  @track folderObject = '';
  @track root = '';

  folderRecursion(current) {
    let children = '';
    let oneChild = '';
    let parent = '';

    if(current.Id == undefined){
      return;
    }
    children = current.Zudoc_Child_Folders__r;
    let items = [];
    for(oneChild in children){
      oneChild = children[oneChild];
      parent = oneChild.Zudoc_Parent_Folder__c;
      if(oneChild != undefined){
        items.push(
          {
            label: oneChild.Name,
            name: oneChild.Name,
            parentId: current.Id,
            expanded: false,
            items: this.folderRecursion(this.folders[oneChild.Id])
          });
      }
    }
    return items;
  }

  @track items = [];

}