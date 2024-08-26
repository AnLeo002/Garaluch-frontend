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
  object:any;
  proList:any=[];
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
    if(refer == " prom"){
      let promFinded:boolean = this.invoice.promInvoiceDTOList.some((prom:any) => prom.id === id);
      console.log(promFinded);
      if(promFinded){
        this.invoice.promInvoiceDTOList.push();
      }else{
        console.log("papi estoy aqui");
      }
    }else{
      let productFinded:boolean = this.invoice.productInvoiceDTOList.some((product:any) => product.id === id);
      if(productFinded){
        this.invoice.productInvoiceDTOList.push();
      }
    }
    if(this.invoice.amount >= this.object.amount || this.object.amount == 0){
      Swal.fire("No es posible agregar mas productos","","warning")
    }else{
     this.invoice.amount++;
     this.shoppingService.addShoppingInvoice(this.invoice);
      
    }
  }

  substract(id:any,refer:any){
    this.invoice.amount--;
    this.shoppingService.updateShoppingInvoice(this.invoice);
  }


  productsAdd(id:any,refer:any){
    if(refer == "prom"){
      return this.invoice.promInvoiceDTOList.some((prom:any) => prom.id === id);
    }else{
      return this.invoice.productInvoiceDTOList.some((product:any) => product.id === id);
    }
  } 
}
