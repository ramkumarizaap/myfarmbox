import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  baseURL: string;
  setFilter: any;
  data: any = [];
  size: any = [{name:'Small',checked:false},{name:'Medium',checked:false},{name:'Big',checked:false}];
  selSize: any;
  structure: any = { lower: 100, upper: 500 };
  constructor(public appSettings: AppSettingsService,public params: NavParams,
  public viewCtrl: ViewController){
    this.baseURL = this.appSettings.getBaseUrl();
    this.data = this.params.data.name;
    console.log('Nav Params',this.data);
    if(this.data != ''){
      this.structure = this.data.price;
      this.size = this.data.size;
    }
  }
  
  closeModal() {
    this.viewCtrl.dismiss(this.setFilter);
  }
  applyFilter(){
    this.setFilter = {
      price: this.structure,
      size: this.size
    };
    console.log('Applied Filter',this.setFilter);
    this.closeModal();
  }

  clearFilter(){
    this.setFilter = '';
    this.size = [{name:'Small',checked:false},{name:'Medium',checked:false},{name:'Big',checked:false}];
    this.structure = { lower: 100, upper: 500 };
  }
}