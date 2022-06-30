import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME_FIELD = 'Zudoc_Folder__c.Name';
const RECORD_ID_FIELD = 'Zoduc_Folder__c.Id';
const PARENT_FOLDER = 'Zudoc_Parent_Folder__r.Name';
const folderFields = [
  NAME_FIELD,
  RECORD_ID_FIELD,
  PARENT_FOLDER
];
export default class FolderView extends LightningElement {
  @api recordId;
  name;
  @wire(getRecord, { recordId: `$recordId`, fields: folderFields })
  loadFolder({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      this.name = getFieldValue(data, NAME_FIELD);
      const Records = getFieldValue(data, RECORD_ID_FIELD);
      const Parents = getFieldValue(data, PARENT_FOLDER);
    }
  }
  menuOption = 'folders';

  get displayFolderMenu() {
    return this.menuOption === 'folders';
  }

  get displayCreateMenu() {
    return this.menuOption === 'create';
  }

  get displayImanageMenu() {
    return this.menuOption === 'imanage';
  }

  handleMenuSelect(event) {
    this.menuOption = event.detail.name;
  }
}