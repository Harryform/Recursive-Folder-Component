import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';

export default class FolderViewMenu extends LightningElement {
  folders;
  myRecordId;
  name;

  // @wire(getFolderRecords)
  // gettingChildren({ error, data }) {
  //   if (data) {
  //     this.folders = data;
  //     for(let k=0; k<data.length; k++) {
  //       if(data[k].Zudoc_Child_Folders__r == null) {
  //         console.log('tester3', data[k].Name);
  //         let uniqueItems = [];
  //         if(!uniqueItems.includes(data[k].Name)) {
  //           uniqueItems.push(data[k].Name);
  //         }
  //         this.lvlOne = [...this.lvlOne, {label: data[k].Name, name: data[k].Name, expanded: false, items: [this.lvlOne]}];
  //       }
  //     }
  //     this.error = undefined;
  //   } else if (error) {
  //     this.error = error;
  //     this.folders = undefined;
  //   }
  // }

  // this is the current progress on a recursive function
  // @wire(getFolderRecords)
  // folderRecursion({error, data}) {
  //   if (data) {
  //     this.folders = data;
  //     for (let i=0; i<data.length; i++) {
  //       if (data[i].Zudoc_Parent_Folder__c == null) {
  //         let root = [];
  //         root.push(data[i]);
  //         console.log('TESTER', data[i].Name);
  //       } else if (data[i].Zudoc_Parent_Folder__c != null) {
  //         let newList = [];
  //         if (!newList.includes(data[i].Name)) {
  //           newList.push(data[i].Name);
  //           console.log('TESTER2', newList);
  //         }
  //       }
  //     }
  //     this.error = undefined;
  //   } else if(error) {
  //     this.error = error;
  //     this.folders = undefined;
  //   }
  // }


  // currently this works, but I need to make the query a Map in APEX
  @wire(getFolderRecords)
  gettingParents({ error, data }) {
    if (data) {
      this.folders = data;
      console.log('folders', JSON.parse(JSON.stringify(this.folders)));
      for(let i=0; i<data.length; i++) {
        if(data[i].Zudoc_Parent_Folder__c == null) {
          console.log(data[i].Zudoc_Child_Folders__r);
          for(let j=0; j<data[i].Zudoc_Child_Folders__r.length; j++) {
            this.items = [...this.items,
            {label: data[i].Zudoc_Child_Folders__r[j].Name, name: data[i].Zudoc_Child_Folders__r[j].Name, expanded: false, items: [this.items]}];
          }
        }
      }
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.folders = undefined;
    }
  }

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