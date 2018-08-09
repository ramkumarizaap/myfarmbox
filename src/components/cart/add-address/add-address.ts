import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html'
})
export class AddAddressPage implements OnInit {
  addressForm: FormGroup;
  addressFormSubmitted: boolean = false;
  constructor(public _fbuilder: FormBuilder,public alertService: AlertController ){
    

  }
  ngOnInit(){
    this.loadAddressForm();   
   }

   loadAddressForm(){
    this.addressForm = this._fbuilder.group({
      name:['',Validators.compose([Validators.required])],
      street_name:['',Validators.compose([Validators.required,Validators.email])],
      area:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
    });
   }
}