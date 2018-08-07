import { Component, Input } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
@Component({
  selector: 'page-product-images',
  templateUrl: 'product-images.html'
})
export class ProductImages {
 baseURL: string;
 @Input() public product: any;
 imgURL: string = "";
 constructor (public appService: AppSettingsService){
   this.baseURL = this.appService.getBaseUrl();
 }
  ngOnChanges(){
    console.log('Product Images',this.product);
    this.imgURL = this.product.images[0].src;
  }
  changeImg(img: string){
    this.imgURL = img;
  }
}
