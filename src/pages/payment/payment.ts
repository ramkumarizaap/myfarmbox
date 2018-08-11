import { Component } from '@angular/core';
import { CartService, CartSourceInterface } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { PaymentResultPage } from '../payment-result/payment-result';
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  cartCount: number = 0;
  order: any;
  paymentFormSubmitted: boolean = false;
  items: CartSourceInterface = {
    cart:null,
    cartTotal:null,
    cartItems:[],
    cartTotalQty:null,
    totalItems:null
  };
  payment_method: any = [
    {label:'Cash on Delivery',type:'cod',name:'Cash on Delivery'},
    // {label:'Credit or Debit Card / Netbanking / UPI',type:'bacs',name:'Direct Bank Transfer'}
  ];
  paymentForm: FormGroup;
  constructor(public orderService: OrderService,public cart: CartService,
  public _fb: FormBuilder, public alertCtrl: AlertController,
  public loader: LoadingController, public nav: NavController  ){
    this.cart.cart$.subscribe((res)=>{
      console.log('Cart',res);
      if(res)
      {
        this.items = res;
        this.cartCount = res.totalItems;
      }
    });
    this.loadPaymentForm();
    this.loadOrderForm();
  }

  loadOrderForm(){
    this.orderService.order$.subscribe((res)=>{
      this.order = res;
      console.log('Ordered',this.order);
    });
  }

  loadPaymentForm(){
    this.paymentForm = this._fb.group({
      payment_type:['',Validators.required]
    });
  }

  savePaymentForm(){
    this.paymentFormSubmitted = true;
    if(this.paymentForm.valid)
    {
      let load = this.loader.create({
        content: 'Please Wait...'
      });
      load.present();
      this.orderService.insertProperty('set_paid',true);
      this.orderService.insertProperty('payment_method',this.paymentForm.value.payment_type.type);
      this.orderService.insertProperty('payment_method_title',this.paymentForm.value.payment_type.name);
      this.orderService.createOrder(this.order.orderAPI).subscribe((res)=>{
        load.dismiss();
        console.log('Create Order',res);
        this.nav.setRoot(PaymentResultPage,{order:res});
        
      });
    }
    else{
      let error = this.alertCtrl.create({
        title:'Sorry!',
        message:'Please Select Payment Method',
        buttons:['OK']
      });
      error.present();
    }
  }

  
}