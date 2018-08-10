import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { NavController,ViewController,NavParams, AlertController } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html'
})
export class AddressListPage {
  orderItems: any;
  address: any = [];
  selAddressForm: FormGroup;
  constructor(public appSettings: AppSettingsService,
  public nav: NavController,public alertCtrl: AlertController,
  public params: NavParams,public orderService: OrderService,
  public user: UserService,
  public _fb: FormBuilder){
  let a = this.params;
  console.log('Address',a);
  this.orderService.order$.subscribe((res)=>{
    console.log('On LOad',res);
    this.orderItems = res;
  });

  this.loadSelAddressForm();

  this.user.getShippingAddress().subscribe((res)=>{
    console.log('Address',res);
    if(res['status'] === 'success')
    {
      for(const a of this.objectKeys(res['address'])){
        const add: AddressCheckedInterface = {
          shipping_first_name : res['address'][a].shipping_first_name,
          shipping_last_name : res['address'][a].shipping_last_name,
          shipping_address_1 : res['address'][a].shipping_address_1,
          shipping_address_2 : res['address'][a].shipping_address_2,
          shipping_city : res['address'][a].shipping_city,
          shipping_state : res['address'][a].shipping_state,
          shipping_country : res['address'][a].shipping_country,
          shipping_postcode : res['address'][a].shipping_postcode,
          checked: false
        };
        this.address.push(add);
      }
      console.log('Assg Address',this.address);
    }
    else{
      let error = this.alertCtrl.create({
        title:'Error!',
        message: res['message'],
        buttons:['OK']
      });
      error.present();
    }
  });
  }

  objectKeys(obj) {
    return Object.keys(obj);
}

loadSelAddressForm(){
  this.selAddressForm = this._fb.group({
    selectedAddress:[null]
  });
}



  addAddress(){
    this.nav.push(AddAddressPage);
  }

  saveAddress(){
    console.log('Set Address',this.selAddressForm.value);
    this.orderService.insertProperty('shipping',this.selAddressForm.value.selectedAddress);
    this.nav.pop();
  }

  ionViewDidEnter() {
    console.log('Popup Close',this.orderItems);
}
  
}

export interface AddressCheckedInterface{
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_postcode: string;
  checked: boolean;
}