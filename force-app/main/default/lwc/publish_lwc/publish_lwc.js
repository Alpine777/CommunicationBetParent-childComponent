import { LightningElement,track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class Publish_lwc extends LightningElement {
    context = createMessageContext();
    @track accountListTrack;
    connectedCallback(){
        getAccounts()
            .then(result =>{
                this.accountListTrack = result;
            })
            .catch(error=>{
                this.accountListTrack = error;
            });
    }
    handleClick(event) {
        event.preventDefault();
        const message = {
        recordId: event.target.dataset.value,
        recordData: { value: "message from Lightning Web Component" }
    };
    publish(this.context, SAMPLEMC, message);
}
}