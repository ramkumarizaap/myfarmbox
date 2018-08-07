import { NgModule, No_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableHeader } from 'scroll/scroll-directive';
import { ErrorPage } from 'error/error';
import { FilterPage } from 'filter-page/filter';
import { HeaderPage } from 'partials/header/header';
import { FooterPage } from 'partials/footer/footer';

@NgModule({
  imports:[
    CommonModule,
  ],
  exports:[
    ExpandableHeader,
    ErrorPage,
    FilterPage,
    HeaderPage,
    FooterPage
  ],
  declarations:[ExpandableHeader,ErrorPage,FilterPage,HeaderPage,FooterPage]
})
export class SharedModule{
}
