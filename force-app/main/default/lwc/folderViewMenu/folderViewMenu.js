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
      const folderInfo = {};
      let folder = '';
      let folderId = '';
      let root = '';
      let childId = [];

      for(folder in data){
        folderId = `${data[folder]['Id']}`;
        childId = `${data[folder]['Zudoc_Child_Folders__r']}`;
        const parentId = `${data[folder]['Zudoc_Parent_Folder__c']}`;
        const folderName = `${data[folder]['Name']}`;
        console.log('FOLDER NAME', folderName);
        console.log('PARENT TEST', folder + "'s parent Id is " + parentId);
        if(parentId == 'undefined'){
          root = folderId;
          console.log('ROOT PLEASE?', root);
        }
      }
      folderList = this.folderRecursion(data, root, []);
      console.log('FOLDER STILL?', folder);
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

  folderRecursion(result, current, newData) {
    const folderName = 'Name';
    const folderId = 'Id';
    const child = 'Zudoc_Child_Folders__r';
    const childId = child[folderId];
    if(current['Id'] == undefined){
      console.log('NO DEFINITION', current['Name']);
      return;
    }
    console.log('BEFORE FOR LOOP', current, current[child]);
    for(let j=0; j<result.length; j++){
      console.log('CHILDS', result[j][child]);
      if (result[j][child] != null) {
        console.log('NEW CHILD', result[j][child]);
        if (!newData.items){
          newData.items = result;
          console.log('NEW DATA', newData);
          for (let k = 0; k < result[j][child].length; k++){
            newData.items.push(
              {
                Id: child[folderId],
                Zudoc_Parent_Folder__c: child[k].Zudoc_Parent_Folder__c,
                label: child[k][folderName],
                name: child[k].Name,
                expanded: false,
                items: newData.items[k][child]
              });
            this.folderRecursion(result, child[k], newData.items[k]);
          }
        }
      }
    }
    console.log('NEW TEST', newData);
    return newData;
  }

  @track newJson = [];
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