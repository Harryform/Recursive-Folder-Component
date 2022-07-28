public with sharing class FolderController {
  @AuraEnabled(cacheable=true scope='global')
  public static Map<Id, Zudoc_Folder__c> getFolderRecords(){
    List<Zudoc_Folder__c> folderList = [
          SELECT
            Id,
            Name,
            Zudoc_Parent_Folder__c,
            Zudoc_Parent_Folder__r.Name,
            (SELECT Id, Name FROM Zudoc_Child_Folders__r)
          FROM Zudoc_Folder__c
        ];
    Map<Id, Zudoc_Folder__c> folderMap = new Map<Id, Zudoc_Folder__c>(folderList);
    return folderMap;
  }

  @AuraEnabled
  public static Zudoc_Folder__c submitNewFolder(String folderName, Id parentFolder){
    Zudoc_Folder__c newFolder = new Zudoc_Folder__c();
    newFolder.Name = folderName;
    newFolder.Zudoc_Parent_Folder__c = parentFolder;

    insert newFolder;
    return newFolder;
  }
}