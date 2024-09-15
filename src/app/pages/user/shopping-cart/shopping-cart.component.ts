import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  invoice:any; /* = {
    username: 'britney',
    total: 0, payment: false,
    promInvoiceDTOList:[] ,
    productInvoiceDTOList: [{
      amount
        :
        2,
      object
        : {
        amount
          :
          12,
        category
          :
          "Pasabocas",
        dayBuying
          :
          "2024-06-12",
        description
          :
          "Papas de pollo superricas",
        id
          :
          10,
        name
          :
          "papas superricas",
        price
          :
          2000,
        url
          :
          "https://supermercadocomunal.com/47582-large_default/papas-super-ricas-pollo-25-gr.jpg"
      }
    }]
  } */

  amountProduct: number = 0;

  constructor(private invoiceService: InvoiceService, private shoppingCart: ShoppingService) { }
  ngOnInit(): void {
    this.invoice = this.shoppingCart.getShoppingInvoice();

  }

  deleteElement(id: any, string: string) {

  }

  invoiceEmpty() {
    if (this.invoice.productInvoiceDTOList.length == 0 && this.invoice.promInvoiceDTOList.length == 0) {
      return true;
    }
    return false;
  }

  add(id:number,refer:string){
    if(refer == "prom"){
      const addProm = this.invoice.promInvoiceDTOList.find((prom:any) => prom.object.id == id)
      ++addProm.amount;
    }
    const addProduct = this.invoice.productInvoiceDTOList.find((prom:any) => prom.object.id == id)
      ++addProduct.amount;      
  }
  substract(id:number,refer:string){
    if(refer == "prom"){
      const subProm = this.invoice.promInvoiceDTOList.find((prom:any) => prom.object.id == id)
      --subProm.amount;
    }
    const subProduct = this.invoice.productInvoiceDTOList.find((prom:any) => prom.object.id == id)
      --subProduct.amount;      
  }

}
