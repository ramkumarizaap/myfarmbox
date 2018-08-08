import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartService, CartSourceInterface } from '../../services/cart.service';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  cartCount: number = 0;
  items: CartSourceInterface = {
    cart:null,
    cartTotal:null,
    cartItems:[],
    cartTotalQty:null,
    totalItems:null
  };
  constructor(public cart: CartService,public nav: NavController){
    this.cart.cart$.subscribe((res)=>{
      console.log('Cart',res);
      if(res)
      {
        this.items = res;
        this.cartCount = res.totalItems;
      }
  });
  }

  continueShop(){
    this.nav.setRoot(HomePage);
  }
}
