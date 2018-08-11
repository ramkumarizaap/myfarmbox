import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject } from 'rxjs';
// import { map,mergeMap,catchError } from "rxjs/operators";
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class OrderService {

  private order: OrderInterface = {};
  // source for observable
  public baseURL: string = "";
  private orderSource: BehaviorSubject<OrderSourceInterface> = new BehaviorSubject(null);
  // observable stream
  public order$ = this.orderSource.asObservable();


  constructor(private http: HttpClient,private appSettings: AppSettingsService) {
    this.baseURL = this.appSettings.getBaseUrl();
   }

  public insertProperty(type:string,data: any){
    //if(this.order.hasOwnProperty(type)){
      this.order[type] = data;
    //}
    console.log('Inser Property',this.order);
    this.updateCartSouce();
  }

  public insertProduct(product: ProductInterface, string, qty: number) {
    if (this.order.line_items[product.product_id]) {
      if (this.order.line_items[product.product_id].hasOwnProperty('quantity')) { // Update
        this.order.line_items[product.product_id].quantity += qty;
      } else { // Add
        if (this.order.line_items[product.product_id].quantity) {
          this.order.line_items[product.product_id].quantity = qty;
        }
      }
    } else { // Add
      this.order.line_items[product.product_id] = product;
      // if (this.cart[product.id].variants && this.cart[product.id].variants[product.id]) {
        this.order.line_items[product.product_id].quantity = qty;
      // }
    }

    // trigger orderSource
    this.updateCartSouce();
  }

  public updateFront(product:any,index:number,qty:number){
    console.log('From Order',this.order);
  }

  public update(product: ProductInterface,qty:number) {
    if (this.order.line_items[product.product_id]) {
      if (this.order.line_items[product.product_id].orderedQuantity) { // Update
        this.order.line_items[product.product_id].orderedQuantity = qty;
      }
    } else { // Add
      let p: ProductInterface = {product_id:product.product_id,quantity:qty,variation_id:null};
      this.order.line_items[product.product_id] = p;
      if (this.order.line_items[product.product_id].quantity) {
        this.order.line_items[product.product_id].quantity = qty;
      }
    }

    // trigger orderSource
    this.updateCartSouce();
  }

  public remove(product: ProductInterface) {
    if (!this.order.line_items[product.product_id]) {
      return;
    }

    if (this.order.line_items[product.product_id]) {
      this.order.line_items[product.product_id].quantity = 0;
    }

    if (this.order.line_items[product.product_id]) {
      let found = false;
          if (this.order.line_items[product.product_id].quantity) {
            found = true;
      }

      if (!found) {
        delete this.order.line_items[product.product_id];
      }
    }

    // trigger orderSource
    this.updateCartSouce();
  }



  private updateCartSouce() {
    // update cart
    // this.updateCartData();
    const sourceData: OrderSourceInterface = {
      orderAPI : this.order
    } 
    this.orderSource.next(sourceData);
  }

  private updateCartData()
  {
    /* */
    // for(const productId in this.order.line_items){
    //   if(this.order.line_items.hasOwnProperty(productId)){
    //     const product = this.order[productId];
    //     if(product.quantity){
    //       this.cartTotal += (product.orderedQuantity * product.price);
    //       this.cartItems.push(item);
    //       this.totalItems++;
    //       this.cartTotalQty = Number(this.cartTotalQty) + Number(product.orderedQuantity);
    //     }
    //   }
    // }

  }
  public resetCartData(): Promise<boolean>
  {    
    return new Promise((resolve, reject)=>{
      this.order = {};
      const SourceData : OrderSourceInterface = {
        orderAPI: null,
      };
      this.orderSource.next(SourceData);
      resolve(true);
    });
  }

  public createOrder(params:any){
    /*const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: params
    };*/
    return this.
            http.
            post(this.baseURL+'wp-json/wc/v2/orders',params);
  }
}
export interface OrderInterface{
  [key: string]: CreateOrderSourceInterface
}

export interface OrderSourceInterface{
orderAPI: OrderInterface
}

export interface CreateOrderSourceInterface {
  payment_method: string,
  payment_method_title: string,
  set_paid: boolean,
  billing: BillingInterface,
  shipping: ShippingInterface,
  line_items:Array<ProductInterface> 
  shipping_lines:Array<ShippingLineInterface>
}

export interface BillingInterface{
  first_name: string,
  last_name: string,
  address_1: string,
  address_2: string,
  city: string,
  state: string,
  postcode: number,
  country: string,
  email: string,
  phone: string
}

export interface ShippingInterface{
  first_name: string,
  last_name: string,
  address_1: string,
  address_2: string,
  city: string,
  state: string,
  postcode: number,
  country: string
}

export interface ProductInterface{
  product_id: number,
  variation_id: number,
  quantity: number
}

export interface ShippingLineInterface{
  id:number,
  method_id: string,
  method_title: string,
  total: number
}