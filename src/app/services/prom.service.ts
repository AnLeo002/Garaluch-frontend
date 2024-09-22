import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PromService {

  constructor(private http:HttpClient) { }
  public saveProm(prom:any){
    return this.http.post(`${baseUrl}/prom/save`,prom)
  }
  public deleteProm(promId:any){
    return this.http.delete(`${baseUrl}/prom/delete/${promId}`);
  }
  public findAll(){
    return this.http.get(`${baseUrl}/prom/findAll`);
  }
  public findPromById(promId:any){
    return this.http.get(`${baseUrl}/prom/${promId}`)
  }
  public updateProm(prom:any,id:any){
    return this.http.put(`${baseUrl}/prom/update/${id}`,prom);
  }
  public findPromByName(promName:any){
    return this.http.get(`${baseUrl}/prom/name/${promName}`)
  }
  public savePromsInLocal(proms:any){
    return sessionStorage.setItem("promsList",JSON.stringify(proms));
  }
  public getPromsListInLocal(){
    let pro = sessionStorage.getItem("promsList");
    if(pro != null){
      return JSON.parse(pro);
    }
    return null;
  }
}
