import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'page-pincode-check',
  templateUrl: 'pincode-check.html'
})
export class PincodeCheckPage {
 pincode: number;
 availclass: string = "success";
 pincodeStatus: string = "";
  constructor(public userService: UserService,
              public alertCtrl: AlertController){

  }

  checkPincode(){
    this.pincodeStatus = "";
    if(this.pincode !== 0)
    {
      alert(this.pincode);
      this.userService.checkPincode(this.pincode).subscribe((res)=>{
        console.log('Check Pincode',res);
        if(res['status'] === 'success')
          this.pincodeStatus = res['message'];
        else{
          this.availclass = "error";
          this.pincodeStatus = res['message'];
        }
      });
    }
    else{
      /*let alert = this.alertCtrl.create({
        title:'Error',
        message:'Please Enter your area pincode',
        buttons:['OK']
      });
      alert.present();*/
    }
  }
}
