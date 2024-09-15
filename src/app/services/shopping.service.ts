import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private amountShopping = new BehaviorSubject<number>(0);
  currentData = this.amountShopping.asObservable();

  constructor() { }

  addShoppingInvoice(invoice:any){
    localStorage.setItem("shoppingCartInvoice",JSON.stringify(invoice))
  }
  updateShoppingInvoice(invoice:any){
    localStorage.setItem("shoppingCartInvoice",JSON.stringify(invoice));
  }
  getShoppingInvoice(){
    let pro = localStorage.getItem("shoppingCartInvoice");
    if(pro != null){
      return JSON.parse(pro);
    }
    return null;
  }
  deleteShoppingInvoice(){
    localStorage.removeItem("shoppingCartInvoice")
  }

  updateAmountShopping(newData:number){
    this.amountShopping.next(newData);
  }
}
