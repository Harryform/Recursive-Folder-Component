import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';
import { getRecord } from 'lightning/uiRecordApi';

export default class FolderViewMenu extends LightningElement {
  folders;
  name;
  root;
  folder;

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
    let child = '';
    let parent = '';
    let childId = '';

    if(current.Id == undefined){
      return;
    }
    children = current.Zudoc_Child_Folders__r;
    let items = [];
    for(child in children){
      child = children[child];
      childId = child.Id;
      parent = child.Zudoc_Parent_Folder__c;
      if(child != undefined){
        items.push(
          {
            id: child.Id,
            label: child.Name,
            name: child.Id,
            parentId: current.Id,
            expanded: false,
            items: this.folderRecursion(this.folders[child.Id])
          });
      }
    }
    return items;
  }

  @track items = [];

  handleSelect(event){
    let targetName = event.detail.name;
    console.log('CHOSEN', targetName);
  }
}