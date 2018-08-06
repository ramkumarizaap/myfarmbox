import { Component,ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Slides } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';

import { ProductService } from '../../services/product.service';
import { ProductListingPage } from '../product-listing/product-listing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dyClassName: string;
  @ViewChild(Slides) slides: Slides;
  public baseURL: string = "";
  vegBoxes: any = [];
  allProducts: any = [];
  constructor(private appSettings: AppSettingsService,
              public navCtrl: NavController,
              private iab: InAppBrowser,
            private productService: ProductService) {
       this.baseURL = this.appSettings.getBaseUrl();
      
  }
  ngOnInit(){
    
    this.loadProducts();
  }
  loadProducts(){
    this.productService.mappedProducts$.subscribe((res)=>{
     this.allProducts  = this.productService.getSearchProducts();
      console.log('Mapped Products',res);
      if(res)
      {
        let resp: any = res;
        resp.forEach(element => {
          if(element.name === "Boxes"){
            this.vegBoxes = element.products;
          }
        });
        console.log('Veg Boxes',this.vegBoxes);
      }
    });
  }

  clickPay(){
    const browser = this.iab.create('http://www.google.com');
    browser.on('loadstop').subscribe(event=>{
      alert('Event'+ JSON.stringify( event ));
    });
  }


   goPages(page:string){
    this.navCtrl.setRoot(ProductListingPage,{name:page});
   }
  
}
