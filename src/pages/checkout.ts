import { Component } from '@angular/core';
import { LoadingController,AlertController, NavController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService, CartSourceInterface } from '../../services/cart.service';
import { CartPage } from '../cart/cart';
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  showTab: string = "personal";
  items: CartSourceInterface = {};
  cartCount: number = 0;
  constructor(
    public alertCtrl: AlertController,
    public loader: LoadingController,
    public nav: NavController,
    public appService: AppSettingsService,
    public cart: CartService,
    public userService: UserService
  ){
    this.loadCart();
  }
  loadCart(){
    this.cart.cart$.subscribe((res)=>{
      this.items = res;
      this.cartCount = res.totalItems;
    });
  }
  nextStep(str:string){
    this.showTab = str;
  }
  
  continuePayment(){
  }

}
