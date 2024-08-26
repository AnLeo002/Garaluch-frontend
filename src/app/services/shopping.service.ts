import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor() { }

  addShoppingInvoice(invoice:any){
    sessionStorage.setItem("shoppingCartInvoice",JSON.stringify(invoice))
  }
  updateShoppingInvoice(invoice:any){
    sessionStorage.setItem("shoppingCartInvoice",JSON.stringify(invoice));
  }
  getShoppingInvoice(){
    let pro = sessionStorage.getItem("shoppingCartInvoice");
    if(pro != null){
      return JSON.parse(pro);
    }
    return null;
  }
  deleteShoppingInvoice(){
    sessionStorage.removeItem("shoppingCartInvoice")
  }
}
