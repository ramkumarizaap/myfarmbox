import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartService } from '../../../services/cart.service';
import { CartPage } from '../../../pages/cart/cart';
@Component({
  selector: 'page-header',
  templateUrl: 'header.html'
})
export class HeaderPage {
  cartCount: number = 0;
  constructor(public cart: CartService,public nav: NavController){
    this.cart.cart$.subscribe((res)=>{
      if(res)
        this.cartCount = res.totalItems;
  });
  }

  openCart(){
    this.nav.push(CartPage);
  }
}
