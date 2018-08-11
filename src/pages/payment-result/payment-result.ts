import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-payment-result',
  templateUrl: 'payment-result.html'
})
export class PaymentResultPage {
  result: any = {id:''};
  baseURL: string = "";
  constructor(public params: NavParams,public appSettings: AppSettingsService,
  public nav: NavController){
    this.baseURL = this.appSettings.getBaseUrl();
    console.log('Order Params',this.params.data);
    if(this.params.data.order)
      this.result = this.params.data.order;
  }

 gotoHome(){
   this.nav.setRoot(HomePage);
 }

  
}