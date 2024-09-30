import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ShoppingService } from '../../../services/shopping.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  invoice: any;
  amountTotal: number = 0;
  totalPro: number = 0;

  constructor(private invoiceService: InvoiceService, private shoppingCart: ShoppingService,private router:Router) { }
  ngOnInit(): void {
    this.invoice = this.shoppingCart.getShoppingInvoice();
    this.shoppingCart.currentData.subscribe(data => {
      this.amountTotal = data;
    })
    this.addTotalPrice();
  }

  deleteElement(id: any, refer: "prom" | "product") {
    Swal.fire({
      text: "Estas seguro de eliminar este producto?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      icon: "warning"
    }).then(result => {
      if (result.isConfirmed) {
        if (refer == "prom") {
          this.invoice.promInvoiceDTOList = this.invoice.promInvoiceDTOList.filter((prom: any) => prom.object.id != id);
        } else {
          this.invoice.productInvoiceDTOList = this.invoice.productInvoiceDTOList.filter((product: any) => product.object.id != id);
        }
        this.shoppingCart.updateShoppingInvoice(this.invoice);
        this.shoppingCart.updateAmountShopping(this.invoice);
        this.addTotalPrice();
      }
    })
  }
  invoiceEmpty() {//Activa algunos componentes de html si no hay productos o promociones en el carrito
    if (this.invoice.productInvoiceDTOList.length == 0 && this.invoice.promInvoiceDTOList.length == 0) {
      return true;
    }    
    return false;
  }
  updateAmountInvoice(id: number, refer: string, operation: "-" | "+") {
    if (refer == "prom") {//Metodo que permite actualizar la cantidad especifica a cada producto o prom
      const addProm = this.invoice.promInvoiceDTOList.find((prom: any) => prom.object.id == id);
      this.haddlerUpdateItem(addProm, operation);
    } else {
      const addProduct = this.invoice.productInvoiceDTOList.find((prom: any) => prom.object.id == id);
      this.haddlerUpdateItem(addProduct, operation);
    }
    this.addTotalPrice();
  }
  haddlerUpdateItem(pro: any, operation: "-" | "+") {//Le da la funcionalidad a los botones de + o - para aumentar la cantidad de productos o promociones
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
    } else {
      Swal.fire("Error en base de datos", "", "error");
    }
  }
  addTotalPrice() {
    //Este metodo va a sumar el total del precio de los productos
    this.invoice.total = this.invoice.productInvoiceDTOList.reduce((acc: number, product: any) => {
      return acc + (product.object.price * product.amount);
    }, 0) + this.invoice.promInvoiceDTOList.reduce((acc: number, prom: any) => {
      return acc + (prom.object.price * prom.amount);
    }, 0);
    //Verifica la cantidad total de productos y promociones
    this.totalPro = this.invoice.productInvoiceDTOList.reduce((acc: number, product: any) => {
      return acc + product.amount;
    }, 0) + this.invoice.promInvoiceDTOList.reduce((acc: number, prom: any) => {
      return acc + prom.amount;
    }, 0)
  }
  saveSale() {
    Swal.fire({
      title: "Confimacion de compra",
      text: "¿Seguro quieres seguir con la compra?",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonText: "Seguir",
      icon: "info"
    }).then(result => {
      if (result.isConfirmed) {
        const invoiceSave = JSON.parse(JSON.stringify(this.invoice));//Esta manera de copiar el objeto me permite que los cambios que genere en la copia no afecten el contenido original

        this.changeInfoPro(invoiceSave.productInvoiceDTOList);
        this.changeInfoPro(invoiceSave.promInvoiceDTOList);

        invoiceSave.payment = true;

        this.invoiceService.saveInvoice(invoiceSave).subscribe((data) => {
          this.shoppingCart.emptyLists(invoiceSave);//Se borra el listado de las pro ya que la factura ya se genero
          this.shoppingCart.updateAmountShopping(invoiceSave)//Actualizamos el numero en el carrito
          this.router.navigate(['/user/invoices'])
          Swal.fire("Compra exitosa","","success")
        },error=>{
          Swal.fire("","No es posible generar la compra","error")
        });
      }
    })
  }
  changeInfoPro(item: any) {//Al backend solo enviaremos el id del pro y su cantidad, el objeto no nos sirve para ser enviado, por eso lo eliminamos
    item.map((pro: any) => {
      pro.id = pro.object.id;
      delete pro.object;//Eliminamos esta propiedad ya que para guardar los cambios no lo necesitamos
    })
  }


}
