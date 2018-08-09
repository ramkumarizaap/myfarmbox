import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { NavController } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html'
})
export class AddressListPage {
 
  constructor(public appSettings: AppSettingsService,
  public nav: NavController){
   

  }

  addAddress(){
    this.nav.push(AddAddressPage);
  }
  
}