import { Component, Input } from '@angular/core';
@Component({
  selector: 'page-product-description',
  templateUrl: 'product-description.html'
})
export class ProductDescription {
 @Input() public product: any;
  constructor(){

  }
}