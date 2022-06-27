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
}