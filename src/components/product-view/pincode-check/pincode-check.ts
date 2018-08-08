import { Component, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'page-pincode-check',
  templateUrl: 'pincode-check.html'
})
export class PincodeCheckPage {
  @Output() public getPincode = new EventEmitter<any>();
 pincode: number = null;
 showMsg: boolean = false;
 availclass: string = "success";
 pincodeStatus: string = "";
  constructor(public userService: UserService,
              public alertCtrl: AlertController){

  }

  checkPincode(){
    this.showMsg = true;
    console.log('Pin',this.pincode);
    this.pincodeStatus = "";
    this.getPincode.emit(this.pincode);
    if(this.pincode !== null && typeof this.pincode !== undefined)
    {
      this.userService.checkPincode(this.pincode).subscribe((res)=>{
        console.log('Check Pincode',res);
        if(res['status'] === 'success')
        {
          this.availclass = "success";
          this.pincodeStatus = res['message'];
        }
        else{
          this.availclass = "error";
          this.pincodeStatus = res['message'];
        }
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title:'Error',
        message:'Please Enter your area pincode',
        buttons:['OK']
      });
      alert.present();
    }
  }
}
