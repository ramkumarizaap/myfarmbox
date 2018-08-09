import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ProductViewPage } from '../pages/product-view/product-view';
import { LoginPage } from '../pages/account/login/login';
import { HowItWorks } from '../pages/how-it-works/how-it-works';
import { AboutUs } from '../pages/about-us/about-us';
import { WhatWeDeliver } from '../pages/what-we-deliver/what-we-deliver';
import { ContactUs } from '../pages/contact-us/contact-us';
import { ProductService } from '../services/product.service'; 
import { AddAddressPage } from '../components/cart/add-address/add-address';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AddAddressPage;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public productService: ProductService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Home', component: HomePage,icon:'home' },
      { title: 'How It Works', component: HowItWorks,icon:'ios-settings' },
      { title: 'About Us', component: AboutUs,icon:'ios-contact' },
      { title: 'Shop', component: LoginPage,icon:'ios-cart' },
      { title: 'What We Deliver', component: WhatWeDeliver,icon:'ios-jet' },
      { title: 'Contact Us', component: ContactUs,icon:'ios-call' },
    ];
    
  }
  ngOnInit() { 
    this.productService.getAllProducts().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
