import { Component } from '@angular/core';
import { LoadingController,AlertController, NavController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { UserService } from '../../services/user.service';
import { CartService, CartSourceInterface } from '../../services/cart.service';
import { HomePage } from '../home/home';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  cartCount: number = 0;
  items: CartSourceInterface = {
    cart:null,
    cartTotal:null,
    cartItems:[],
    cartTotalQty:null,
    totalItems:null
  };
  constructor(
    public alertCtrl: AlertController,
    public loader: LoadingController,
    public nav: NavController,
    public appService: AppSettingsService,
    public cart: CartService,
    public userService: UserService,
    public orderService: OrderService
  ){
    this.loadCart();
    this.loadLineItems();
  }

  loadLineItems(){
   let pro: any= [];
    for(const proID of this.items.cartItems){
      const product = {
        product_id: proID.id,
        quantity: proID.orderedQuantity,
        variant_id: null
      };
      pro.push(product);
    }
    this.orderService.insertProperty('line_items',pro);
  }

  loadCart(){
    this.cart.cart$.subscribe((res)=>{
      this.items = res;
      this.cartCount = res.totalItems;
      console.log('Checkout',this.items);
    });
  }
  
  continueShop(){
    this.nav.setRoot(HomePage);
  }
  continuePayment(){
  }

}
