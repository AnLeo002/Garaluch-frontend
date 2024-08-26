import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

  invoice:any
  invoiceProm:any;
  invoiceProduct:any

  constructor(private invoiceService:InvoiceService){}
  ngOnInit(): void {
    this.invoiceService.findAllInvoice().subscribe(
      (data:any)=>{
        console.log(data);
        
        this.invoiceProduct = data[0].productInvoiceList;
        this.invoiceProm = data[0].promInvoiceList;

        console.log(this.invoiceProm);
        
      }
    )
  }

  deleteElement(id:any,string:string){

  }
}
