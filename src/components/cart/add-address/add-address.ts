import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';
import { AlertController,ViewController, NavController } from 'ionic-angular';
import { OrderService } from '../../../services/order.service';
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html'
})
export class AddAddressPage implements OnInit {
  addressForm: FormGroup;
  order:any;
  addressFormSubmitted: boolean = false;
  @Output() addressValues = new EventEmitter<any>();
  constructor(public _fbuilder: FormBuilder,public alertService: AlertController,
  public view: ViewController,public nav: NavController,public orderService: OrderService ){
    
    this.orderService.order$.subscribe((res)=>{
      this.order = res;
    });

  }
  ngOnInit(){
    this.loadAddressForm();   
   }

   loadAddressForm(){
    this.addressForm = this._fbuilder.group({
      first_name:['',Validators.compose([Validators.required])],
      last_name:['',Validators.compose([Validators.required])],
      address_1:['',Validators.compose([Validators.required,Validators.email])],
      address_2:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      postcode:['',Validators.compose([Validators.required])],
      country:['India'],
    });
   }

   saveAddress(){
     this.addressFormSubmitted = true;
     //if(this.addressForm.valid)
     //{
       this.nav.pop();
       this.orderService.insertProperty('shipping',this.addressForm.value);
       console.log('Add Order',this.order);
      //  this.addressValues.emit(this.addressForm.value);
     //}
   }
}