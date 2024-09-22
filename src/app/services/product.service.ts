import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public saveProduct(product:any){
    return this.http.post(`${baseUrl}/product/save`,product)
  }
  public deleteProduct(productId:any){
    return this.http.delete(`${baseUrl}/product/delete/${productId}`);
  }
  public findAll(){
    return this.http.get(`${baseUrl}/product/findAll`);
  }
  public findProductById(productId:any){
    return this.http.get(`${baseUrl}/product/${productId}`)
  }
  public updateProduct(product:any,id:any){
    return this.http.put(`${baseUrl}/product/update/${id}`,product);
  }
  public findProductByName(productName:any){
    return this.http.get(`${baseUrl}/product/name/${productName}`)
  }
  public saveProductsInLocal(products:any){
    return sessionStorage.setItem("productsList",JSON.stringify(products));
  }
  public getProdutsListInLocal(){
    let pro = sessionStorage.getItem("productsList");
    if(pro != null){
      return JSON.parse(pro);
    }
    return null;
  }
}
