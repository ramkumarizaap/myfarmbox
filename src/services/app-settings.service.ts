import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {
  private apiUrl:string;
  private baseUrl:string;
  constructor() { 
    this.apiUrl = 'http://localhost/myfarmbox/api';
    this.baseUrl = 'http://localhost/myfarmbox/';
    if (location.href.indexOf('myfarmbox') !== -1) {
      this.apiUrl = 'https://myfarmbox/api';
      this.baseUrl = 'https://myfarmbox/';
    }
  }

  /**
   * getApiUrl
   */
  public getApiUrl() {
    return this.apiUrl;
  }
  public getBaseUrl() {
    return this.baseUrl;
  }
}
