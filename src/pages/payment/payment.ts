import { Component } from '@angular/core';
import { CartService, CartSourceInterface } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  cartCount: number = 0;
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
  public _fb: FormBuilder){
    this.cart.cart$.subscribe((res)=>{
      console.log('Cart',res);
      if(res)
      {
        this.items = res;
        this.cartCount = res.totalItems;
      }
    });
    this.loadPaymentForm();
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
      this.orderService.insertProperty('payment_method',this.paymentForm.value.payment_type.type);
      this.orderService.insertProperty('payment_method_title',this.paymentForm.value.payment_type.name);
    }
  }

}