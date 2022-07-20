import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';
import getFileRecords from '@salesforce/apex/FileController.getFileRecords';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class FolderView extends LightningElement {

  folders;
  name;
  root;
  folder;
  show = false;

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
    this.show = true;
  }

  @wire(getFileRecords)
  fileData({data, error}){
    if(data){
      this.files = data;
      console.log('DATA', JSON.parse(JSON.stringify(this.files)));
      this.error = undefined;
    } else if(error){
      this.files = undefined;
      this.error = error;
    }
  }

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    alert("Your file has been uploaded");
  }

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
    [...this.template
      .querySelectorAll('lightning-input, lightning-textarea')]
      .forEach((input) => { input.value = ''; });
  }

  handleNameChange({ detail }) {
    this.workSpaceName = detail.value;
  }

  columns = [
    {   label: 'File Type',
        fieldName: 'fileType',
        type: 'text/icon',
        cellAttributes: {
          iconName: { fieldName: 'trendIcon' },
          iconPosition: 'left',
        },
     },
    {
        label: 'File Name',
        fieldName: 'fileName',
        type: 'text',
    },
    {
        label: 'Created Date',
        fieldName: 'createdDate',
        type: 'date',
        typeAttributes: { currencyCode: 'EUR', step: '0.001' },
    },
    { label: 'Last Modified Date', fieldName: 'lastModified', type: 'date' },
    { label: 'File Size', fieldName: 'size', type: 'text' },
];

  data = [
    {
        id: 'a',
        fileType: 'PNG',
        fileName: 'Cloudhub',
        createdDate: '2022-07-15',
        lastModified: '2022-07-16',
        size: '18.7KB',
        trendIcon: 'doctype:image',
    },
    {
        id: 'b',
        fileType: 'PDF',
        fileName: 'Quip',
        createdDate: '2022-07-15',
        lastModified: '2022-07-16',
        size: '8.1MB',
        trendIcon: 'doctype:pdf',
    },
  ];
}
