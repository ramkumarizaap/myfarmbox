import { Component } from '@angular/core';
import { AppSettingsService } from '../../services/app-settings.service';
@Component({
  selector: 'page-error',
  templateUrl: 'error.html'
})
export class ErrorPage {
  baseURL: string;
  constructor(public appSettings: AppSettingsService){
    this.baseURL = this.appSettings.getBaseUrl();
  }

}