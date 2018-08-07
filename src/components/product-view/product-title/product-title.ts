import { Component, Input } from '@angular/core';
@Component({
  selector: 'page-product-title',
  templateUrl: 'product-title.html'
})
export class ProductTitle {
 @Input() public product: any;
 constructor(){
   
 }
  
}
