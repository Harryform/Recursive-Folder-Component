public with sharing class FileController {
    @AuraEnabled(cacheable=true scope='global')
    public static List<SObject> getFileRecords(){
        List<SObject> filesAndFolders = [
        SELECT
        ContentDocumentId,
        ContentDocument.Title,
        ContentDocument.CreatedDate,
        ContentDocument.ContentModifiedDate,
        ContentDocument.FileType,
        ContentDocument.ContentSize,
        LinkedEntityId,
        LinkedEntity.Name
        FROM ContentDocumentLink WHERE LinkedEntityId IN
        ( SELECT Id FROM Zudoc_Folder__c ) AND LinkedEntity.Type='Zudoc_Folder__c'
        ];
        return filesAndFolders;
    }
}
