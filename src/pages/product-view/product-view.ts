import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html'
})
export class ProductViewPage {
  baseURL: string;
  pincodeStatus: string = "";
  productID: number;
  pincode: number;
  quantity: number = 1;
  product: any;
  constructor(public appSettings: AppSettingsService,public params: NavParams,
  public viewCtrl: ViewController,public productService: ProductService,
  public userService: UserService,public alertCtrl: AlertController){
    this.baseURL = this.appSettings.getBaseUrl();
    if(this.params.data.id){
      this.productID = this.params.data.id;
    }
  }
  
  ngOnInit(){
    console.log('OnInit Product ID',this.productID);
    let pro: any = this.productService.getSearchProducts();
      console.log('Mapped Oninit Products',pro);
      pro.filter(item=>{
        if(item.id === this.productID){
          this.product = item;
        }
      });

      console.log('SIngle Product',this.product);
  }
 qtyUpdate(type: string){
    if(type === 'add'){
      if(this.quantity <= 10)
        this.quantity += 1;
    }
    else if(type === 'minus'){
      if(this.quantity >= 2)
        this.quantity -= 1;
    }
 }
  checkPincode(){
    if(this.pincode !== '')
    {
      this.userService.checkPincode(this.pincode).subscribe((res)=>{
        if(res['status'] === 'success')
          this.pincodeStatus = "This pincode is available to deliver.";
        else{
          let err = alertCtrl.create({
            title:'Error',
            message: res['msg'],
            buttons:['OK']
          });
          err.present();
        }
      });
    }
    else{
      let alert = alertCtrl.create({
        title:'Error',
        message:'Please Enter your area pincode',
        buttons:['OK']
      });
      alert.present();
    }
  }
  
  addToCart(){
    if(this.pincode !== ''){
    }
    else{
       let alert = alertCtrl.create({
         title:'Error',
         message:'Please check your pincode area availability!',
         buttons:['OK']
       });
      alert.present();
    }
  }
}
