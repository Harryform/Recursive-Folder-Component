import { LightningElement, wire, track } from 'lwc';
import getFolderRecords from '@salesforce/apex/FolderController.getFolderRecords';

export default class FolderViewMenu extends LightningElement {
  folders;
  myRecordId;

  // @wire(getFolderRecords)
  // gettingFolderTree({ error, data }) {
  //   if (data) {
  //     for(let i=0; i<data.length; i++) {
  //       this.items = [...this.items, {label: data[i+1].Name, name: data[i+1].Name, expanded: false, items: []} ];
  //     }
  //     this.error = undefined;
  //   } else if (error) {
  //     this.error = error;
  //     this.folders = undefined;
  //   }
  // }

  items = [
  {
    label: 'Correspondence',
    name: 'correspondence',
    expanded: false,
    items: [
      {
        label: 'Correspondence with Clients',
        name: 'clients',
        expanded: false,
        items: [
          {
            label: 'Emails',
            name: 'client emails',
            expanded: false,
            items: [],
          },
          {
            label: 'Phone Calls',
            name: 'client calls',
            expanded: false,
            items: [],
          },
        ],
      },
      {
        label: 'Correspondence with Insurer',
        name: 'insurer',
        expanded: false,
        items: [
          {
            label: 'Emails',
            name: 'insure emails',
            expanded: false,
            items: [],
          },
          {
            label: 'Phone Calls',
            name: 'insure calls',
            expanded: false,
            items: [],
          },
        ]
      },
    ],
  },
  {
    label: 'Expenses',
    name: 'expenses',
    expanded: false,
    items: [
      {
        label: 'Case Cost',
        name: 'case cost',
        expanded: false,
        items: [],
      },
      {
          label: 'Client Cost',
          name: 'client cost',
          expanded: false,
          items: [],
      },
      {
        label: 'Receipts',
        name: 'receipts',
        expanded: false,
        items: [],
      },
    ],
  },
  {
    label: 'Incident Information',
    name: 'incident',
    expanded: false,
    items: [
      {
        label: 'Damages',
        name: 'damages',
        expanded: false,
        items: [
          {
            label: 'Description',
            name: 'descrip',
            expanded: false,
            items: [],
          },
          {
            label: 'Photos',
            name: 'photos',
            expanded: false,
            items: [],
          },
        ]
      },
      {
        label: 'Injured Statement',
        name: 'injured',
        expanded: false,
        items: [],
      },
      ]
    },
    {
      label: 'Settlement',
      name: 'settlement',
      expanded: false,
      items: [],
    },
  ]
}