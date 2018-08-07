import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/account/login/login';
import { HowItWorks } from '../pages/how-it-works/how-it-works';
import { AboutUs } from '../pages/about-us/about-us';
import { WhatWeDeliver } from '../pages/what-we-deliver/what-we-deliver';
import { ContactUs } from '../pages/contact-us/contact-us';
import { ProductListingPage } from '../pages/product-listing/product-listing';
import { ProductViewPage } from '../pages/product-view/product-view';

import { SharedModule }  from '../components/shared-module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppSettingsService } from '../services/app-settings.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

import { PipesModule } from 'w-ng5';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    HowItWorks,
    AboutUs,
    WhatWeDeliver,
    ContactUs,
    ProductListingPage,
    ProductViewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PipesModule,
    SharedModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AboutUs,
    HowItWorks,
    WhatWeDeliver,
    ContactUs,
    ProductListingPage,
    ProductViewPage
  ],
  providers: [
    StatusBar,
    AppSettingsService,
    ProductService,
    CartService,
    UserService,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
