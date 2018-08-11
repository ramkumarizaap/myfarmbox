import { Component } from '@angular/core';
import { AppSettingsService } from '../../../services/app-settings.service';
import { NavController,ViewController,NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  public loader: LoadingController,
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
      let load = this.loader.create({
        content:'Please Wait...'
      });
      load.present();
      for(const a of this.objectKeys(res['address'])){
        const add: AddressCheckedInterface = {
          first_name : res['address'][a].shipping_first_name,
          last_name : res['address'][a].shipping_last_name,
          address_1 : res['address'][a].shipping_address_1,
          address_2 : res['address'][a].shipping_address_2,
          city : res['address'][a].shipping_city,
          state : res['address'][a].shipping_state,
          country : res['address'][a].shipping_country,
          postcode : res['address'][a].shipping_postcode,
        };
        setTimeout(()=>{
          load.dismiss();
          this.address.push(add);
        },2000);
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
    this.orderService.insertProperty('billing',this.selAddressForm.value.selectedAddress);
    this.nav.pop();
  }

  ionViewDidEnter() {
    console.log('Popup Close',this.orderItems);
}
  
}

export interface AddressCheckedInterface{
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}