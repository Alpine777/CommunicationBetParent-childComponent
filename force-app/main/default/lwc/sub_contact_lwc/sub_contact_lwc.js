import { LightningElement, wire , track } from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { reduceErrors } from 'c/ldsUtils';

import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const fields = [NAME_FIELD, TITLE_FIELD, PHONE_FIELD, EMAIL_FIELD];
export default class Sub_contact_lwc extends LightningElement {
    fields = [NAME_FIELD, TITLE_FIELD, PHONE_FIELD, EMAIL_FIELD];
    subscribtion = null;
    recordId;
    @track contactId;
    @track objectApiName = 'Contact';

    Name;
    Title;
    Phone;
    Email;

    @wire(getRecord, {recordId: '$recordId', fields })
    wiredRecord({error, data}){
        if(error){
            this.dispatchToast(error);
        }
        else if (data){
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data,item))
            );
        
        }
    }
    @wire(MessageContext)
    messageContext;
    debugger;
    subsrcibeToMessageChannel(){
        if(!this.subscribtion){
            this.subscribtion=subscribe(
                this.messageContext,
                SAMPLEMC,
                (message) => this.handleMessage(message),
                {scope: APPLICATION_SCOPE}
            );
        }
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message){
        this.recordId = message.recordId;
        this.contactId = message.recordId;
    }
    connectedCallback(){
        this.subsrcibeToMessageChannel();
    }
    disconnectedCallback(){
        this.unsubscribeToMessageChannel();
    }
    dispatchToast(error){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading Contact',
                message: 'message',
                varient: 'error'
            })
        );
    }

}