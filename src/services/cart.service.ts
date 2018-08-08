import { Injectable } from '@angular/core';

import {  BehaviorSubject } from 'rxjs';
// import { map,mergeMap,catchError } from "rxjs/operators";

@Injectable()
export class CartService {

  private cart: CartInterface = {};
  private cartTotal = 0;
  private totalItems = 0;
  private cartTotalQty:number = 0;
  private cartItems: Array<VariantInterface>;
  // source for observable
  private cartSource: BehaviorSubject<CartSourceInterface> = new BehaviorSubject(null);
  // observable stream
  public cart$ = this.cartSource.asObservable();


  constructor() { }

  public insert(product: ProductInterface, variantSKU: string, qty: number) {
    if (this.cart[product.id]) {
      if (this.cart[product.id].orderedQuantity) { // Update
        this.cart[product.id].orderedQuantity += qty;
      } else { // Add
        if (this.cart[product.id].orderedQuantity) {
          this.cart[product.id].orderedQuantity = qty;
        }
      }
    } else { // Add
      this.cart[product.id] = product;
      // if (this.cart[product.id].variants && this.cart[product.id].variants[product.id]) {
        this.cart[product.id].orderedQuantity = qty;
      // }
    }

    // trigger cartSource
    this.updateCartSouce();
  }

  public updateFront(product:any,index:number,qty:number){
    console.log('Fron Cart',this.cart);
  }

  public update(product: ProductInterface,qty:number) {
    if (this.cart[product.id]) {
      if (this.cart[product.id].orderedQuantity) { // Update
        this.cart[product.id].orderedQuantity = qty;
      }
    } else { // Add
      this.cart[product.id] = product;
      if (this.cart[product.id].orderedQuantity) {
        this.cart[product.id].orderedQuantity = qty;
      }
    }

    // trigger cartSource
    this.updateCartSouce();
  }

  public remove(product: ProductInterface) {
    if (!this.cart[product.id]) {
      return;
    }

    if (this.cart[product.id]) {
      this.cart[product.id].orderedQuantity = 0;
    }

    if (this.cart[product.id]) {
      let found = false;
          if (this.cart[product.id].orderedQuantity) {
            found = true;
      }

      if (!found) {
        delete this.cart[product.id];
      }
    }

    // trigger cartSource
    this.updateCartSouce();
  }

  public contents() {
    this.updateCartSouce();
    return this.cartItems;
  }

  private updateCartSouce() {
    // update cart
    this.updateCartData();

    const cartSouceData: CartSourceInterface =  {
      cart: this.cart,
      cartItems: this.cartItems,
      cartTotal: this.cartTotal,
      totalItems: this.totalItems,
      cartTotalQty: this.cartTotalQty
    };
    
    this.cartSource.next(cartSouceData);
  }

  private updateCartData() {
    this.cartTotal = 0;
    this.totalItems = 0;
    this.cartItems = [];
    this.cartTotalQty = 0;
    /* */

    for(const productId in this.cart){
      if(this.cart.hasOwnProperty(productId)){
        const product = this.cart[productId];
        let item: VariantInterface = {
          id: product.id,
          name: product.name,
          orderedQuantity: product.orderedQuantity,
          available: null,
          price: product.price,
          quantity: null,
          sku: product.id
        };
        if(product.orderedQuantity){
          this.cartTotal += (product.orderedQuantity * product.price);
          this.cartItems.push(item);
          this.totalItems++;
          this.cartTotalQty = Number(this.cartTotalQty) + Number(product.orderedQuantity);
        }
      }
    }

    /*for (const productId in this.cart) {
      if (this.cart.hasOwnProperty(productId)) {
        const product = this.cart[productId];
        for (const variantSKU in product.variants) {
          if (product.variants.hasOwnProperty(variantSKU)) {
            const variant = product.variants[variantSKU];
            if (variant.orderedQuantity) {
              this.cartTotal += (variant.orderedQuantity * variant.price);
              this.cartItems.push(variant);
              this.totalItems++;
              this.cartTotalQty = Number(this.cartTotalQty) + Number(variant.orderedQuantity);
            }
          }
        }
      }
    }*/
  }
  public resetCartData(): Promise<boolean>
  {    
    return new Promise((resolve, reject)=>{
      this.cart = {};
      const cartSouceData : CartSourceInterface = {
        cart: null,
        cartItems: [],
        cartTotal: 0,
        totalItems: 0,
        cartTotalQty:0
      };
      this.cartSource.next(cartSouceData);
      console.log('Reset',cartSouceData);
      resolve(true);
    });
  }
}

export interface CartInterface {
  [key: string]: ProductInterface;
}

export interface CartSourceInterface {
  cart: CartInterface;
  cartTotal: number;
  totalItems: number;
  cartTotalQty:number;
  cartItems: Array<VariantInterface>;
}

export interface VariantInterface {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  available: boolean;
  orderedQuantity?: number;
}

export interface ProductInterface {
  id: string;
  sku: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
  featuredImage: string;
  images: Array<ProductImageInterface>;
  options: Array<string>;
  variants: {[key: string]: VariantInterface};
  colors: Array<string>;
  size: Array<string>;
  video:string;
  orderedQuantity: number;
}

export interface ProductImageInterface
{
  variant_id:number;
  img_name:string;
}