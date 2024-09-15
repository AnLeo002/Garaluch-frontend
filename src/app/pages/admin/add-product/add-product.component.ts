import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { MethodsService } from '../../../services/methods.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: any;
  product = {
    name: '',
    amount: '',
    weight:'',
    price: '',
    dayBuying: '',
    description: '',
    category:'',
    url:''
  };

  constructor(private serviceProduct: ProductService, private categoryService: CategoryService,private route:Router,private method:MethodsService) {

  }
  ngOnInit(): void {
    this.categoryService.findAllCategories().subscribe(
      (data:any)=>{
        this.categories = data;
        
      }
    )
  }

  public formSubmit() {
    this.product.dayBuying = this.method.transformDate(this.product.dayBuying)
    if(this.method.validateForm(this.product)){
      this.serviceProduct.saveProduct(this.product).subscribe(
        (data: any) => {
          Swal.fire("", "Producto creado correctamente", "success");
          this.route.navigate(['admin/products'])
        }, error => {
          Swal.fire("Error creando producto", "", "error");
        }
      ) 
    }
    
  }
  
  
}
