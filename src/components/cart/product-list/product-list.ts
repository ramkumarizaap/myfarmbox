import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { CartService,CartSourceInterface } from '../../../services/cart.service';
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {
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
  changeQty(product: any,qty){
    let newQty: number = qty.target.value;
    console.log('New Qty',qty);
    this.cart.update(product,newQty);
  }

  removeItem(product: any){
    console.log('Remove',product);
    this.cart.remove(product);
  }

}