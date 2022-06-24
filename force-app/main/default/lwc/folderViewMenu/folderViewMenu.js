import { LightningElement } from 'lwc';

export default class FolderViewMenu extends LightningElement {
  items = [
  {
    label: 'Correspondence',
    name: '1',
    expanded: false,
    items: [
      {
        label: 'Correspondence with Clients',
        name: '2',
        expanded: false,
        items: [
          {
            label: 'Emails',
            name: '3',
            expanded: false,
            items: [],
          },
          {
            label: 'Phone Calls',
            name: '4',
            expanded: false,
            items: [],
          },
        ],
      },
      {
        label: 'Correspondence with Insurer',
        name: '2',
        expanded: false,
        items: [
          {
            label: 'Emails',
            name: '3',
            expanded: false,
            items: [],
          },
          {
            label: 'Phone Calls',
            name: '4',
            expanded: false,
            items: [],
          },
        ]
      },
    ],
  },
  {
    label: 'Expenses',
    name: '1',
    expanded: false,
    items: [
      {
        label: 'Case Cost',
        name: '2',
        expanded: false,
        items: [],
      },
      {
          label: 'Client Cost',
          name: '2',
          expanded: false,
          items: [],
      },
      {
        label: 'Receipts',
        name: '2',
        expanded: false,
        items: [],
      },
    ],
  },
  {
    label: 'Incident Information',
    name: '2',
    expanded: false,
    items: [
      {
        label: 'Damages',
        name: '2',
        expanded: false,
        items: [
          {
            label: 'Description',
            name: '3',
            expanded: false,
            items: [],
          },
          {
            label: 'Photos',
            name: '4',
            expanded: false,
            items: [],
          },
        ]
      },
      {
        label: 'Injured Statement',
        name: '2',
        expanded: false,
        items: [],
      },
      ]
    },
    {
      label: 'Settlement',
      name: '2',
      expanded: false,
      items: [],
    },
  ]
}