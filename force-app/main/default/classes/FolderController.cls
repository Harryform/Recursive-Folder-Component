public with sharing class FolderController {
  @AuraEnabled(cacheable=true scope='global')
  public static Zudoc_Folder__c[] getFolderRecords() {
    return [
      SELECT
        Id,
        Name,
        Zudoc_Parent_Folder__c,
        Zudoc_Parent_Folder__r.Name,
        (SELECT Id, Name FROM Zudoc_Child_Folders__r)
      FROM Zudoc_Folder__c
    ];
  }
}