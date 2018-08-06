import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html'
})
export class ProductViewPage {
  baseURL: string;
  productID: number;
  product: any;
  constructor(public appSettings: AppSettingsService,public params: NavParams,
  public viewCtrl: ViewController,public productService: ProductService){
    this.baseURL = this.appSettings.getBaseUrl();
    if(this.params.data.id){
      this.productID = this.params.data.id;
    }
  }
  
  ngOnInit(){
    console.log('OnInit Product ID',this.productID);
    let pro: any = this.productService.getSearchProducts();
      console.log('Mapped Oninit Products',pro);
      pro.filter(item=>{
        if(item.id === this.productID){
          this.product = item;
        }
      });

      console.log('SIngle Product',this.product);
  }
 
}