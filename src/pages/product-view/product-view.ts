import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppSettingsService } from '../../services/app-settings.service';
import { ProductService,ProductInterface } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartInterface,CartService } from '../../services/cart.service';
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html'
})
export class ProductViewPage {
  baseURL: string;
  pincodeStatus: string = "";
  productID: number;
  public pincode: number = null;
  quantity: number = 1;
  product: any;
  constructor(public appSettings: AppSettingsService,public params: NavParams,
  public viewCtrl: ViewController,public productService: ProductService,
  public userService: UserService,public alertCtrl: AlertController,
public cart: CartService){
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
  
 setPincode(event:any){
  this.pincode = event;
 }
 setQty(qty:any){
  this.quantity = qty;
 }
 
  addToCart(){
    console.log('Qty',this.quantity);
    if(this.pincode !== null){
      let key = this.product.id;
      this.cart.insert(this.product,key,this.quantity);
      this.cart.cart$.subscribe((res)=>{
        console.log('Cart',res);
      });
    }
    else{
       let alert = this.alertCtrl.create({
         title:'Error',
         message:'Please check your pincode area availability!',
         buttons:['OK']
       });
      alert.present();
    }
  }
}
