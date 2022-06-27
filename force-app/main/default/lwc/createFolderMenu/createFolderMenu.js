import { LightningElement, api } from 'lwc';

export default class CreateFolderMenu extends LightningElement {
  @api
  myRecordId;

  get acceptedFormats() {
    return ['.pdf', '.png'];
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files;
    alert('No. of files uploaded : ' + uploadedFiles.length);
  }

  value = 'inProgress';

  get options() {
    return [
      { label: 'Correspondence', value: 'correspondence' },
      { label: 'Expenses', value: 'expenses' },
      { label: 'Incident Information', value: 'incident' },
      { label: 'Settlement', value: 'settle' },
    ];
  }

  handleChange(event) {
    this.value = event.detail.value;
  }
}