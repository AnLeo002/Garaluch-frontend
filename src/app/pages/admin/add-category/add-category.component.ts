import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MethodsService } from '../../../services/methods.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  category:any={
    name:''
  }

  constructor(private categoryService:CategoryService, private router:Router,private validate:MethodsService){}

  public formSubmit(){
    if(this.validate.validateForm(this.category)){
      this.categoryService.saveCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire("","Categoria agregada correctamente","success");
        this.router.navigate([`/admin/categories`])
      },error=>{
        if(error.status != 409){
          Swal.fire("Error","Error al agregar una categoria","error");
        }
        Swal.fire("","La categoria ya existe","warning");
      }
    )
    }
    
  }
}
