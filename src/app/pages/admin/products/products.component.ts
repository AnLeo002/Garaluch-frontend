import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  userLogin:any = null;
  user:any;
  productList:any;
  constructor(private productService:ProductService,private login:LoginService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    
    this.user = this.login.getUser();
    this.findAllProducts();
  }
  public findAllProducts(){
    this.productService.findAll().subscribe(
      (data:any)=>{
        this.productList = data;
        console.log(data);
        
      },error=>{
        Swal.fire("","Error al buscar los productos","error");
      }
    )
  }
  public deleteElement(id:any,string:any){
    Swal.fire({
      title:`Eliminar ${string}`,
      text:`¿Esta seguro de eliminar ${string}?`,
      showCancelButton:true,
      cancelButtonText:"Cancelar",
      confirmButtonText:"Confirmar"
    }).then(result=>{
      if(result.isConfirmed){
        Swal.fire({
          text:`Para eleminar ${string} es necesario confirmar su clave`,
          showCancelButton:true,
          input:"password",
        cancelButtonText:"Cancelar",
        confirmButtonText:"Confirmar",
        allowOutsideClick:false
        }).then(result=>{
          if(result.isConfirmed){
            this.userLogin = {
              "username":this.user.username,
              "password":result.value
            }
            this.login.login(this.userLogin).subscribe(
              (data: any)=>{
                this.productService.deleteProduct(id).subscribe(data=>{
                  Swal.fire("Elemento eliminado correctamente","","success");
                  /* this.router.navigate(["/admin/products"]) */
                  window.location.href='http://localhost:4200/admin/proms'
                },(error:any)=>{
                  console.log(error.status);
                  
                  Swal.fire("Error al eliminar el producto","","error");
                })
              },error=>{
                Swal.fire("Error al validar el usuario","","error");
              })
          }
        })
      }
    })
  }
  
}
