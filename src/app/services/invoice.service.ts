import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) {
  }
  public findAllInvoice(){
    return this.http.get(`${baseUrl}/invoice/findAll`);
  }
  public findInvoiceById(id:any){
    return this.http.get(`${baseUrl}/invoice/${id}`);
  }
  saveInvoice(invoice:any){
    return this.http.post(`${baseUrl}/invoice/save`,invoice);
  }
  updateInvoice(invoice:any,id:any){
    return this.http.put(`${baseUrl}/inovice/update/${id}`,invoice)
  }
  deleteInvoice(id:any){
    return this.http.delete(`${baseUrl}/invoice/delete/${id}`);
  }
  updateAmount(invoice:any){
    return this.http.put(`${baseUrl}/invoice/update/amount`,invoice)
  }
  findInvoicesByUsername(username:string){
    return this.http.get(`${baseUrl}/invoice/findAll/${username}`)
  }
  
}
