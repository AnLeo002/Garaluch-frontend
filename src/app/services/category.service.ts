import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public findCategoryById(id:any){
    return this.http.get(`${baseUrl}/category/${id}`);
  }
  public findAllCategories(){
    return this.http.get(`${baseUrl}/category/findAll`);
  }
  public findCategoryByName(name:any){
    return this.http.get(`${baseUrl}/category/name/${name}`);
  }
  public saveCategory(category:any){
    return this.http.post(`${baseUrl}/category/save`,category);
  }
  public updateCategory(category:any,id:any){
    return this.http.put(`${baseUrl}/category/update/${id}`,category);
  }
  public deleteCategory(id:any){
    return this.http.delete(`${baseUrl}/category/delete/${id}`)
  }
}
