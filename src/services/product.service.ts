import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/observable';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
@Injectable()
export class ProductService {
  public w_apiURL = 'https://myfarmbox.in/wp-json/wc/v2/';
  public l_apiURL = 'http://localhost/myfarmbox/api/';
  constructor(private http: HttpClient) { }
  public mappedOptionsById: {[key: string]: OptionInterface};
  public myData:any = [] ;
  public respProducts:any=[];

  private categories: BehaviorSubject<CategoryInterface> = new BehaviorSubject(null);
  public mappedProducts$ = this.categories.asObservable();
  public getSearchProducts(){
    return this.respProducts;
  }

  public getAllProducts(force: boolean = false){
    /*if (!force && this.categories.value) {
      return Observable.of(this.categories.value); 
    }*/
    let params: HttpParams = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: params
    };

    return this
            .http
            .get(this.w_apiURL+'products',{params: params})
            .pipe(map(resp => {
              this.respProducts = resp;
              let mappedProducts: any = [];
              this.respProducts.forEach(item => {
                item.categories.forEach(element => {
                  const cat: CategoryInterface = {
                    id:element.id,
                    name:element.name,
                    products:[]
                  };
                  this.myData.push(cat);
                });
              });
              mappedProducts = this.UniqueArraybyId(this.myData,'id');
              this.respProducts.forEach(item => {
                item.categories.forEach(element => {
                  var x: any = mappedProducts.findIndex(x=>x.id===element.id)
                  if(x >= 0)
                  mappedProducts[x].products.push(item);
                });
              });
              // console.log('Resp products',mappedProducts);
              this.categories.next(mappedProducts);
              return mappedProducts;
    }));
  }

  public UniqueArraybyId(collection, keyname) {
    var output = [], 
        keys = [];

        collection.forEach(function(item) {
        var key = item[keyname];
        if(keys.indexOf(key) === -1) {
            keys.push(key);
            output.push(item);
        }
    });
  return output;
};
  

}
export interface CategoryInterface {
  id: string;
  name: string;
  products: Array<CategryProductInterface>;
}

export interface CategryProductInterface {
  id: string;
  name: string;
  sku: string;
  image: string;
  price:number;
  selected?: boolean;
  created_time:string;
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
  breadcrumb: BreadcrumbInterface;
  video:string;
}


export interface OptionInterface {
  id: string;
  name: string;
  position: number;
  selectedValue?: OptionValuInterface;
  values?: Array<OptionValuInterface>;
}

export interface OptionValuInterface {
  id: string;
  name: string;
  shortCode: string;
}

export interface VariantInterface {
  parent_id:number;
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  available: boolean;
  options: Array<OptionInterface>;
  orderedQuantity?: number;
}

export interface BreadcrumbInterface
{
  product_id:number;
  product_name:string;
  category_id:number;
  category_name:string;
}

export interface ProductImageInterface
{
  variant_id:number;
  img_name:string;
}