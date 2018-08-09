import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html'
})
export class ProductListPage {
  
  constructor(public appSettings: AppSettingsService,public cart: CartService){
   

  }
  

}