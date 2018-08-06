import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUs {
  
  contactForm: FormGroup;
  contactFormSubmitted: boolean = false;
  
  constructor(public navCtrl: NavController,public userService: UserService,public _fbuilder: FormBuilder,public alertService: AlertController ) {

   

  }
  ngOnInit(){
   this.loadContactForm();   
  }

  
  saveContactForm(){
    this.contactFormSubmitted = true;
    if(this.contactForm.valid){
      this.userService.saveContactForm(this.contactForm.value).subscribe((res) => {
        if(res['status'] === 'success'){
          alert('Form submitted successfully!');
          this.contactFormSubmitted = false;
        }
      },(err)=>{
        alert('Form not submitted!!!');
      });
    }
  }
  loadContactForm(){
    this.contactForm = this._fbuilder.group({
      name:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      subject:['',Validators.compose([Validators.required])],
      message:['',Validators.compose([Validators.required])],
    });
  }

  doContact(){
    this.contactFormSubmitted = true;
    if(this.contactForm.valid)
    {
      this.userService.saveContactForm(this.contactForm.value).subscribe((res)=>{
        console.log('Contact',res);
        let status = res['status'];
        let alert = this.alertService.create({
          title: status.charAt(0).toUpperCase() + status.slice(1),
          message: res['msg'],
          buttons:[{
            text:'OK',
            handler:()=>{
              this.contactFormSubmitted = false;
              this.loadContactForm();
            }
          }]
        });
        alert.present();
      },(err)=>{
        let alert = this.alertService.create({
          title:'Error',
          message: 'Something went wrong. Please try again later.',
          buttons:['OK']
        });
        alert.present();
      });
    }
  }
}
