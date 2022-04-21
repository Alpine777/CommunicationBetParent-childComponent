// lmsPublisherWebComponent.js
import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

// Import message service features required for publishing and the message channel
import { MessageContext, publish} from 'lightning/messageService';
import SampleMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Pub_contact_lwc extends LightningElement {
    // @wire(getContacts)
    // contacts;
    @track contactList;
    connectedCallback(){
        getContacts()
            .then(result =>{
                this.contactList = result;
            })
            .catch(error=>{
                this.contactList = error;
            });

        
    }
    @wire(MessageContext)
    messageContext;

    handleContactSelect(event){
        const payload = {recordId: event.target.contact.Id}
        publish(this.messageContext, SampleMC, payload);
    }

}