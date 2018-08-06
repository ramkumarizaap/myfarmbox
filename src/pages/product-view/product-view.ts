import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html'
})
export class ProductViewPage {
  baseURL: string;
  constructor(public appSettings: AppSettingsService,public params: NavParams,
  public viewCtrl: ViewController){
    this.baseURL = this.appSettings.getBaseUrl();
  }
  
 
}