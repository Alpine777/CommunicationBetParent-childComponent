public class ContactController {
    @AuraEnabled
    public Static list<Contact> getContacts(){
        return [Select              Id,
        Name,
        FirstName,
        LastName,
        Title,
        Phone,
        Email From Contact limit 5];
    }
}