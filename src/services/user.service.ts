import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class UserService {
  private userDetailsSource: BehaviorSubject<userInterface> = new BehaviorSubject(null);
  // observable stream
  public baseURL: string = "";
  public userDetails$ = this.userDetailsSource.asObservable();
  constructor(private http: HttpClient,private appSettings: AppSettingsService) {
    this.baseURL = this.appSettings.getBaseUrl();
   }

  public doLogin(form: any){
    let params: HttpParams = new HttpParams();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: form
    };
    return this.
            http.
            post('/users/login',httpOptions);
  }


  public getUserDetails():Observable<any> {
    // let localItem = localStorage.getItem('userDetails');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.
          http.
          post('/users/login',httpOptions).pipe(map(res=>{

            let localItem: userInterface = null;
            localItem = JSON.parse(localStorage.getItem('userDetails'));
            console.log('Local Item',localItem);
            this.userDetailsSource.next(localItem);
            return localItem;
          }));
  }

  public saveContactForm(form:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: form
    };
    return this.
            http.
            post(this.baseURL+'api/users/saveContact',httpOptions);
  }

  public checkPincode(pincode: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: pincode
    };
    return this.
            http.
            post(this.baseURL+'api/users/checkPincode',httpOptions);
  } 
  public getShippingAddress(pincode: number = null){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: pincode
    };
    return this.
            http.
            post(this.baseURL+'api/users/getShippingAddresById',httpOptions);
  }
}
export interface userInterface{
  userId:number;
  firstName:string;
  lastName:string;
  role:string
}