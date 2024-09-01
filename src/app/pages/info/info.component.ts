import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromService } from '../../services/prom.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  id:any;
  refer:any=null;//Representa el tipo de objeto
  object:any;//Aqui guardaremos la promocion o el producto
  amount:any;//Guardamos la cantidad que el usuario va a elegir
  invoice:any;
  
  constructor(private router:ActivatedRoute,private promService:PromService,private productService:ProductService,private shoppingService:ShoppingService){

  }

  ngOnInit(): void {
    this.invoice = this.shoppingService.getShoppingInvoice();
    this.id= this.router.snapshot.params["id"];
    this.refer = this.router.snapshot.params["refer"];
  
    if(this.refer == "prom"){
      /* this.pro.refer='prom';
      this.pro.proId=this.id; */
      this.promService.findPromById(this.id).subscribe(
        (data:any)=>{
          this.object=data;
        },error=>{
            Swal.fire("Error al encontrar la promoción","","error");
        }
      )
    }else{
      this.productService.findProductById(this.id).subscribe(
        (data:any)=>{
          this.object=data;
        },error=>{
            Swal.fire("Error al encontrar la producto","","error");
        }
      )
    }
    
  }

  add(id:any,refer:any){
    let objectAmount ={//Este objeto sera el encargado de guardar el id y la cantidad del producto o promocion que se almacenará en la factura
      id : id,
      amount : 1
    }
    if(this.amount >= this.object.amount || this.object.amount == 0){
      Swal.fire("No es posible agregar mas productos","","warning")
    }else{
      if(refer == "prom"){
        let promFinded:boolean = this.invoice.promInvoiceDTOList.some((prom:any) => prom.id == id);
        if(!promFinded){//Si el producto o prom no se encuentra en la factura se agrega
          this.invoice.promInvoiceDTOList.push(objectAmount);
          this.amount = objectAmount.amount;
        }else{//Si se encuentra se le agrega o se suma cantidad
          let promFinded = this.invoice.promInvoiceDTOList.find((prom:any)=>prom.id == id);
          this.amount = ++promFinded.amount;
        }
      }else{
        let productFinded:boolean = this.invoice.productInvoiceDTOList.some((product:any) => product.id == id);
        if(!productFinded){
          this.invoice.productInvoiceDTOList.push(objectAmount);
          this.amount = objectAmount.amount;
        }else{
          let product = this.invoice.productInvoiceDTOList.find((prom:any)=>prom.id == id);
          this.amount = ++product.amount;
        }
      }
     this.shoppingService.addShoppingInvoice(this.invoice);
      
    }
  }

  substract(id:any,refer:any){
    this.invoice.amount--;
    this.shoppingService.updateShoppingInvoice(this.invoice);
  }


  productsAdd(id:any,refer:any){
    if(refer == "prom"){
      return this.invoice.promInvoiceDTOList.some((prom:any) => prom.id == id);
    }else{
      return this.invoice.productInvoiceDTOList.some((product:any) => product.id == id);
    }
  }

  /* amount(id:any,refer:any){
    if(refer == "prom"){
      const prom = this.invoice.promInvoiceDTOList.some((prom:any) => {prom.id == id});
      console.log(prom);
      
      return prom ? prom.amount : null;
    }else{
      const product = this.invoice.productInvoiceDTOList.find((product:any) => product.id == id);
      return product ? product.amount : null;
    }
  }  */
}
