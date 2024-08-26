import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categories:any;
  userLogin:any;
  user:any;

  constructor(private categoryService:CategoryService,private login:LoginService,private router:Router){}

  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      }
    )
    this.user = this.login.getUser();
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
                this.categoryService.deleteCategory(id).subscribe(data=>{
                  Swal.fire("Elemento eliminado correctamente","","success");
                  this.router.navigate(["/admin/products"])
                }),(error:any)=>{
                  Swal.fire("Error al eliminar el producto","","error");
                }
              },error=>{
                Swal.fire("Error al validar el usuario","","error");
              })
          }
        })
      }
    })
  }

}
