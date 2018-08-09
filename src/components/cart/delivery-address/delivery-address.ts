import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { CartService } from '../../../services/cart.service';
import { NavController } from 'ionic-angular';
import { AddressListPage } from '../address-list/address-list';
@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html'
})
export class DeliveryAddressPage {
  
  constructor(public appSettings: AppSettingsService,public cart: CartService,
  public nav: NavController){
   

  }
  
  changeAddress(){
    this.nav.push(AddressListPage);
  }

}