import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MethodsService } from '../../../services/methods.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit{

  category:any;
  idCategory:any;

  constructor(private categoryService:CategoryService,private method:MethodsService,private route:ActivatedRoute,private router:Router){
  }

  ngOnInit(): void {
    this.idCategory = this.route.snapshot.params['id'];
    this.categoryService.findCategoryById(this.idCategory).subscribe(
      (data:any)=>{
        this.category = data;
      },error=>{
        Swal.fire("Error al recuperar la categoria","","error")
      }
    )
  }
  public formSubmit(){
    if(this.method.validateForm(this.category)){
      this.categoryService.updateCategory(this.category,this.category.id).subscribe(
        data=>{
          Swal.fire("Categoria actualizado correctamente","","success");
          this.router.navigate(['/admin/categories']);
        },error=>{
          Swal.fire("Error al actualizar la categoria","","error")
        }
      )
    }
  }

}
