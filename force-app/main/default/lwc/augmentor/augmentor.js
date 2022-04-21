import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {
    startCounter = 0;
    a =5;
    debugger;
    handleStartChange(event){
        this.startCounter= parseInt(event.target.value);
    }
    handleMaximizeCounter(){
        this.template.querySelector('c-numerator').maximizeCounter(this.a);
    }
}