import { LightningElement, api  } from 'lwc';

export default class Numerator extends LightningElement {
    //@api counter = 0;
    _currentCount = 0;
    priorCount = 0;
    b=5;
    @api
    get counter(){
      return this._currentCount;
    }
    set counter(value){
      this.priorCount = this._currentCount;
      this._currentCount =value;
    }

    handleIncrement() {
      this.counter++;
    }
    handleDecrement() {
      this.counter--;
    }
    handleMultiply(event){
        const factor = event.detail;
        this.counter *= factor;
    }
    debugger;
    @api
    maximizeCounter(alpha){
      this.counter += alpha;
   
    }
    

}