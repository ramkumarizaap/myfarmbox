import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { NavController,ViewController,NavParams } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
import { OrderService } from '../../../services/order.service';
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html'
})
export class AddressListPage {
  orderItems: any;
  constructor(public appSettings: AppSettingsService,
  public nav: NavController,public viewCtrl: ViewController,
  public params: NavParams,public orderService: OrderService){
  let a = this.params;
  console.log('Address',a);
  this.orderService.order$.subscribe((res)=>{
    console.log('On LOad',res);
    this.orderItems = res;
  });
  }

  addAddress(){
    this.nav.push(AddAddressPage);
  }

  ionViewDidEnter() {
    console.log('Popup Close',this.orderItems);
}
  
}