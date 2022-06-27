public with sharing class folderRecordService {
  @AuraEnabled(cacheable=true scope='global')
  public static Zudoc_Folder__c[] getFolderRecords() {
    return [
      SELECT
        Id,
        Name,
        Zudoc_Parent_Folder__c,
        Zudoc_Parent_Folder__r.Name
      FROM Zudoc_Folder__c
    ];
  }

  @AuraEnabled(cacheable=true scope='global')
  public static Zudoc_Folder__c[] searchFolderRecords(String searchTerm) {
    searchTerm = searchTerm.trim();
    if (searchTerm == '') {
      return getFolderRecords();
    }

    searchTerm = '%' + searchTerm + '%';
    return [
      SELECT
        Id,
        Name,
        Zudoc_Parent_Folder__c,
        Zudoc_Parent_Folder__r.Name
      FROM Zudoc_Folder__c
      WHERE Name LIKE :searchTerm
    ];
  }
}