import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public _loginForm: FormGroup;
  public _passwordInputType: string = "password";
  public _passwordIcon : string = "eye-off";
  public loginFormSubmitted: boolean = false;
  constructor(public navCtrl: NavController,public menu: MenuController,public _fbuilder: FormBuilder) {
    this.menu.enable(false);
    this.loadLoginForm();
  }

  loadLoginForm(){
    this._loginForm = this._fbuilder.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required])]
    });
  }

  doLogin(){
    console.log('Login Form',this._loginForm);
    this.loginFormSubmitted = true;
  }
  _toggleViewPassword(event: MouseEvent) {
    event.preventDefault();
    if (this._passwordInputType === "password") {
      this._passwordInputType = "text";
      this._passwordIcon = "eye";
    } else {
      this._passwordIcon = "eye-off";
      this._passwordInputType = "password";
    };
  };

}
