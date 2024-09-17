import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ShoppingService } from '../../../services/shopping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  invoice: any;
  amountTotal:number = 0;
  totalPro:number = 0;

  constructor(private invoiceService: InvoiceService, private shoppingCart: ShoppingService) { }
  ngOnInit(): void {
    this.invoice = this.shoppingCart.getShoppingInvoice();
    this.shoppingCart.currentData.subscribe(data =>{
      this.amountTotal = data;
    })
    this.addTotalPrice();
  }

  deleteElement(id: any,refer:"prom" | "product") {
    Swal.fire({
      text:"Estas seguro de eliminar este producto?",
      showCancelButton:true,
      cancelButtonText:"Cancelar",
      confirmButtonText:"Confirmar",
      icon:"warning"
    }).then(result=>{
      if(result.isConfirmed){
        if(refer == "prom"){
          this.invoice.promInvoiceDTOList = this.invoice.promInvoiceDTOList.filter((prom:any) => prom.object.id != id);
        }else{
          this.invoice.productInvoiceDTOList = this.invoice.productInvoiceDTOList.filter((product:any) => product.object.id != id);
        }
        this.shoppingCart.updateShoppingInvoice(this.invoice);
        this.shoppingCart.updateAmountShopping(this.invoice.productInvoiceDTOList.length + this.invoice.promInvoiceDTOList.length);
        this.addTotalPrice();
      }
    })
  }

  invoiceEmpty() {
    if (this.invoice.productInvoiceDTOList.length == 0 && this.invoice.promInvoiceDTOList.length == 0) {
      return true;
    }
    return false;
  }
  updateAmountInvoice(id: number, refer: string, operation: "-" | "+") {
    if (refer == "prom") {
      const addProm = this.invoice.promInvoiceDTOList.find((prom: any) => prom.object.id == id);
      this.haddlerUpdateItem(addProm,operation);
    } else {
      const addProduct = this.invoice.productInvoiceDTOList.find((prom: any) => prom.object.id == id);
      this.haddlerUpdateItem(addProduct,operation);
    }
    this.addTotalPrice();
  }
  haddlerUpdateItem(pro: any, operation: "-" | "+") {
    if (pro) {
      if (operation == "+") {
        if (pro.amount >= pro.object.amount) {
          Swal.fire("Sin existencias en stock.", "", "warning")
          return;
        }
        ++pro.amount;
      } else {
        if (pro.amount <= 1) {
          Swal.fire("No es posible pedir una cantidad menor a 1", "", "warning")
          return;
        }
        --pro.amount;
      }
      this.shoppingCart.updateShoppingInvoice(this.invoice);
    } else{
      Swal.fire("Error en base de datos", "", "error");
    }
  }
  addTotalPrice(){
    //Este metodo va a sumar el total del precio de los productos
    this.invoice.total = this.invoice.productInvoiceDTOList.reduce((acc: number, product: any) => {
      return acc + (product.object.price * product.amount);
    }, 0) + this.invoice.promInvoiceDTOList.reduce((acc: number, prom: any) => {
      return acc + (prom.object.price * prom.amount);
    }, 0);
    this.totalPro = this.invoice.productInvoiceDTOList.reduce((acc:number,product:any)=>{
      return acc + product.amount;
    },0)+this.invoice.promInvoiceDTOList.reduce((acc:number,prom:any)=>{
      return acc+prom.amount;
    },0)
  }
}
