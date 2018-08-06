import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,ActionSheetController,ModalController } from 'ionic-angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Slides } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';

import { ProductService } from '../../services/product.service';

import { FilterPage } from '../../components/filter-page/filter';

@Component({
  selector: 'page-product-listing',
  templateUrl: 'product-listing.html'
})
export class ProductListingPage implements OnInit {
  products: any = [];
  filters: any = '';
  baseURL: string;
  constructor(public params: NavParams,public appSettings: AppSettingsService,
      public productService: ProductService,public actionSheet: ActionSheetController,
    public modalCtrl: ModalController){
    console.log('Params',this.params);
    this.baseURL = this.appSettings.getBaseUrl();
  }

  ngOnInit(){
    
      this.loadProducts();
  }

  loadProducts(){
    this.products = [];
    this.productService.mappedProducts$.subscribe((res)=>{
      let resp: any = res;
      resp.forEach(element => {
        if(element.name === this.params.data.name)
          this.products = element.products;
      });
      console.log(this.params.data.name, this.products);
    });
  }

  sortBy(){
    let action = this.actionSheet.create({
      title:'Sort By',
      buttons:[{
        text:'Price High to Low',
        icon:'md-arrow-round-down',
        handler:()=>{
          this.doSortByPrice('low');
        }
      },
      {
        text:'Price Low to High',
        icon:'md-arrow-round-up',
        handler:()=>{
          this.doSortByPrice('high');
        }
      },
      {
        text:'Cancel',
        role:'cancel',
        handler:()=>{

        }
      }
    ]
    });
    action.present();
  }

  doSortByPrice(type:string){
    this.products.sort(function(a, b) {
      if(type === 'low')
        return parseFloat(a.price) - parseFloat(b.price);
      else
        return parseFloat(b.price) - parseFloat(a.price);
    });
  }

  filterBy(){
    let pro = this.products;
    if(this.filters){
      this.products = [];
      pro.forEach(element => {
        if(element.price >= this.filters.price.lower && element.price <= this.filters.price.upper)
          this.products.push(element);
      });
    }
    else{
      this.loadProducts();
    }
  }

  openModal(){
    let modal = this.modalCtrl.create(FilterPage,{name:this.filters});
    modal.onDidDismiss(data => {
      console.log('Filter',data);
      this.filters = data;
      this.filterBy();
    });
    modal.present();
  }

}