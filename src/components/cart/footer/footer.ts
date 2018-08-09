import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { CartService,CartSourceInterface } from '../../../services/cart.service';
import { HomePage } from '../../../pages/home/home';
import { NavController } from 'ionic-angular';
import { CheckoutPage } from '../../../pages/checkout/checkout';
@Component({
  selector: 'page-cart-footer',
  templateUrl: 'footer.html'
})
export class CartFooterPage {
  baseURL: string;
  cartCount: number = 0;
  items: CartSourceInterface = {
    cart:null,
    cartTotal:null,
    cartItems:[],
    cartTotalQty:null,
    totalItems:null
  };
  constructor(public appSettings: AppSettingsService,public cart: CartService,
    public nav: NavController){
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
  gotoCheckout(){
    this.nav.push(CheckoutPage);
  }

}