import { Component, OnInit } from '@angular/core';
import { PromService } from '../../../services/prom.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-products-prom',
  templateUrl: './add-products-prom.component.html',
  styleUrl: './add-products-prom.component.css'
})
export class AddProductsPromComponent implements OnInit{

  productList:any;
  prom:any;
  promId:any = null;//Esta variable se encarga de traer el id de la promocion para agregar productos a la misma
  productListForProm:any=[];//Listado de los productos que tendra una promoción


  constructor(private promService:PromService,private route:ActivatedRoute,private productService:ProductService) {  
  }
  ngOnInit(): void {
    //Buscamos la prom
    this.promId = this.route.snapshot.params['promId'];
    this.promService.findPromById(this.promId).subscribe(
      (data:any)=>{
        this.prom = data;
        
        for(let name of this.prom.productEntities){
          this.productListForProm.push(name.name)

        }
        console.log(this.productListForProm);
        
    })
    //Buscamos los productos que queremos agregar
    this.productService.findAll().subscribe(
      (data:any)=>{
        this.productList = data;
      })
  }
  public addProductInProm(product:any): any{
    if(this.productListForProm.length  >= 5){
      Swal.fire("Las promociónes tendran un maximo de 5 productos","","warning");
      return null;
    }
    this.productListForProm.push(product.name);
    this.updateProductsEntitiesInProm(this.productListForProm);
    console.log(this.productListForProm);
    
  }
  selectProduct(name:any){//metodo que cambia el boton 
    let isProductInList = this.productListForProm.some((productSelect:any) => productSelect === name);
    if(isProductInList){
      return true;
    }
    return false
  }
  deleteProductOfProm(name:any){
    Swal.fire({
      title:`Eliminar producto de la promoción`,
      text:`¿Esta seguro de eliminar el producto?`,
      showCancelButton:true,
      cancelButtonText:"Cancelar",
      confirmButtonText:"Confirmar"
    }).then(result=>{
      if(result.isConfirmed){
        console.log(this.productListForProm);
        
        this.productListForProm = this.productListForProm.filter((pro:any) => pro != name);
        this.updateProductsEntitiesInProm(this.productListForProm)
        console.log(this.productListForProm);
        
      }
    })
  }
  public updateProductsEntitiesInProm(productList:any){
    this.prom.productEntities = productList;
    this.promService.updateProm(this.prom,this.promId).subscribe(
      (data:any)=>{ 
      },error=>{
        Swal.fire("Error al agregar o eliminar el producto a la promoción","Error","error")
      }
    )
  }
}
