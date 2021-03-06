import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartService, CartSourceInterface } from '../../services/cart.service';
import { CheckoutPage } from '../checkout/checkout';
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
  newQty: number;
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
  gotoPage(){
    this.nav.push(CheckoutPage);
  }
  continueShop(){
    this.nav.setRoot(HomePage);
  }

 
  changeQty(product: any,qty){
    let newQty: number = qty.target.value;
    console.log('New Qty',qty);
    this.cart.update(product,newQty);
  }
}
