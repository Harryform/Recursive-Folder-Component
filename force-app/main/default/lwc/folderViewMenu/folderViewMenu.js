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
      const folderList = [];
      let folder = '';
      let folderId = '';
      let root = '';
      let childId = [];

      for(folder in data){
        folderId = data[folder];
        childId = data[folder]['Zudoc_Child_Folders__r'];
        const parentId = data[folder]['Zudoc_Parent_Folder__c'];
        const folderName = data[folder]['Name'];
        console.log('FOLDER NAME', folderName);
        console.log('PARENT TEST', folder + "'s parent Id is " + parentId);
        if(parentId == undefined){
          root = folderId;
          console.log('ROOT PLEASE?', root);
          folderList = this.folderRecursion(root, []);
        } else {
          console.log('CURRENT FOLDER', folderId);
          folderList = this.folderRecursion(folderId, []);
        }
        // folderList = this.folderRecursion(root, []);
      }
      console.log('ROOT STILL?', root);
      console.log('HELP', data);
      this.error = undefined;
    } else if(error){
      this.error = error;
      this.folders = undefined;
    }
  }

  @track folderName = '';
  @track folderId = '';
  @track root = '';

  folderRecursion(current, items) {
    const folderName = 'Name';
    const folderId = 'Id';
    let children = '';
    let oneChild = '';
    let parent = '';

    if(current.Id == undefined){
      console.log('NO DEFINITION', current.Id);
      return;
    }
    console.log('BEFORE FOR LOOP', current.Zudoc_Child_Folders__r);
    children = current.Zudoc_Child_Folders__r;
    console.log('CHILDREN', children);

    for(oneChild in children){
      oneChild = children[oneChild];
      parent = oneChild.Zudoc_Parent_Folder__c;
      if(oneChild != undefined){
        console.log('THIS IS THE CHILD', oneChild, current.Name);
        if(!items){
          items = [];
        }
        items.push(
          {
            label: oneChild.Name,
            name: oneChild.Name,
            parentId: current.Id,
            expanded: false,
            items: []
          });
        // this.folderRecursion(oneChild, items);
      }
    }
    console.log('NEW TEST', items);
    return this.folderRecursion(oneChild, items);
  }

  @track newData = [];
  @track items = [];

  // items = [
  // {
  //   label: 'Correspondence',
  //   name: 'correspondence',
  //   expanded: false,
  //   items: [
  //     {
  //       label: 'Correspondence with Clients',
  //       name: 'clients',
  //       expanded: false,
  //       items: [
  //         {
  //           label: 'Emails',
  //           name: 'client emails',
  //           expanded: false,
  //           items: [],
  //         },
  //         {
  //           label: 'Phone Calls',
  //           name: 'client calls',
  //           expanded: false,
  //           items: [],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Correspondence with Insurer',
  //       name: 'insurer',
  //       expanded: false,
  //       items: [
  //         {
  //           label: 'Emails',
  //           name: 'insure emails',
  //           expanded: false,
  //           items: [],
  //         },
  //         {
  //           label: 'Phone Calls',
  //           name: 'insure calls',
  //           expanded: false,
  //           items: [],
  //         },
  //       ]
  //     },
  //   ],
  // },
  // {
  //   label: 'Expenses',
  //   name: 'expenses',
  //   expanded: false,
  //   items: [
  //     {
  //       label: 'Case Cost',
  //       name: 'case cost',
  //       expanded: false,
  //       items: [],
  //     },
  //     {
  //         label: 'Client Cost',
  //         name: 'client cost',
  //         expanded: false,
  //         items: [],
  //     },
  //     {
  //       label: 'Receipts',
  //       name: 'receipts',
  //       expanded: false,
  //       items: [],
  //     },
  //   ],
  // },
  // {
  //   label: 'Incident Information',
  //   name: 'incident',
  //   expanded: false,
  //   items: [
  //     {
  //       label: 'Damages',
  //       name: 'damages',
  //       expanded: false,
  //       items: [
  //         {
  //           label: 'Description',
  //           name: 'descrip',
  //           expanded: false,
  //           items: [],
  //         },
  //         {
  //           label: 'Photos',
  //           name: 'photos',
  //           expanded: false,
  //           items: [],
  //         },
  //       ]
  //     },
  //     {
  //       label: 'Injured Statement',
  //       name: 'injured',
  //       expanded: false,
  //       items: [],
  //     },
  //     ]
  //   },
  //   {
  //     label: 'Settlement',
  //     name: 'settlement',
  //     expanded: false,
  //     items: [],
  //   },
  // ]
}