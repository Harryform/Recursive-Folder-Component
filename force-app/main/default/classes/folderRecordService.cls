public with sharing class folderRecordService {
  @AuraEnabled
  public static string updateFolderRecords(){
    try {
      List<Zudoc_Folder__c> zuList = [SELECT Id, Name, Zudoc_Parent_Folder__c FROM Zudoc_Folder__c];
      return zuList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}