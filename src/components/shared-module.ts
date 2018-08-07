import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule  } from 'ionic-angular';
import { ExpandableHeader } from './scroll/scroll-directive';
import { ErrorPage } from './error/error';
import { FilterPage } from './filter-page/filter';
import { HeaderPage } from './partials/header/header';
import { FooterPage } from './partials/footer/footer';
import { MyApp } from '../app/app.component';
/*Product View Inmport */
import { ProductImages } from './product-view/product-images/product-images';
import { ProductTitle } from './product-view/product-title/product-title';
import { ProductInput } from './product-view/product-input/product-input';
import { ProductDescription } from './product-view/product-description/product-description';
import { PincodeCheckPage } from './product-view/pincode-check/pincode-check';
@NgModule({
  imports:[
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  exports:[
    ExpandableHeader,
    ErrorPage,
    FilterPage,
    HeaderPage,
    FooterPage,
    ProductImages,
    ProductTitle,
    ProductInput,
    ProductDescription,
    PincodeCheckPage
  ],
  declarations:[ExpandableHeader,ErrorPage,FilterPage,HeaderPage,FooterPage,ProductImages,ProductTitle,ProductInput,ProductDescription,PincodeCheckPage],
})
export class SharedModule{
}
