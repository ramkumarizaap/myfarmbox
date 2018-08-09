import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { CartService,CartSourceInterface } from '../../../services/cart.service';
@Component({
  selector: 'page-price-details',
  templateUrl: 'price-details.html'
})
export class PriceDetailsPage {
  baseURL: string;
  cartCount: number = 0;
  items: CartSourceInterface = {
    cart:null,
    cartTotal:null,
    cartItems:[],
    cartTotalQty:null,
    totalItems:null
  };
  constructor(public appSettings: AppSettingsService,public cart: CartService){
    this.baseURL = this.appSettings.getBaseUrl();
    this.cart.cart$.subscribe((res)=>{
      console.log('Cart',res);
        if(res)
        {
          this.items = res;
          this.cartCount = res.totalItems;
        }
    });

  }

}