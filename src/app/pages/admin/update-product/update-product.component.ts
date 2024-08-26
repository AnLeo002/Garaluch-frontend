import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { MethodsService } from '../../../services/methods.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit{

  product:any;
  productId:any;
  categories:any;

  constructor(private productService:ProductService,private route:ActivatedRoute,private categoryService:CategoryService,private validate:MethodsService,private router:Router){
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    
    this.productService.findProductById(this.productId).subscribe(
      (data:any)=>{
        this.product=data;
      },error=>{
        Swal.fire("Error al encontrar el usuario","","error")
      }
    )
    this.categoryService.findAllCategories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(data);
        
      }
    )
  }
  public formSubmit(){
    console.log(this.product.dayBuying);
    
    if(this.validate.validateForm(this.product)){
      this.productService.updateProduct(this.product,this.productId).subscribe(
        (data:any)=>{
          Swal.fire("Producto actualizado correctamente","","success");
          this.router.navigate(['/admin/products']);
        },error=>{
          Swal.fire("Error al acutalizar el producto","","error")
        }
      )
    }
    
  }

}
