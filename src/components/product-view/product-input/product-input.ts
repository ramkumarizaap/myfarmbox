import { Component, Input, Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'page-product-input',
  templateUrl: 'product-input.html'
})
export class ProductInput {
 quantity: number = 1;
 @Input() public product: any;
 @Output() getQty = new EventEmitter<number>();
 constructor(){

 }

 qtyUpdate(type: string){
  if(type === 'add'){
    if(this.quantity <= 9)
      this.quantity += 1;
  }
  else if(type === 'minus'){
    if(this.quantity >= 2)
      this.quantity -= 1;
  }
  this.getQty.emit(this.quantity);
}
  
}
