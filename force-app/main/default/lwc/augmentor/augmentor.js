import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {
    startCounter = 0;
    a =5;
    handleStartChange(event){
        this.startCounter= parseInt(event.target.value);
    }
    handleMaximizerCounter(){
        this.template.querySelector('c-numerator').maximizeCounter(this.a);
    }
}