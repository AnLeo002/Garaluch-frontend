import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { PromService } from '../../../services/prom.service';
import Swal from 'sweetalert2';
import { ShoppingService } from '../../../services/shopping.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{ 

  productList:any=[];
  promList:any=[]
  tipeFilter:any;

  constructor(private productService:ProductService,private promService:PromService,private loginService:LoginService,private router:ActivatedRoute){}

  ngOnInit(): void {
    this.router.params.subscribe(param =>{
      this.tipeFilter = param['filter'] || 'all';//si la url viene vacia va poner por defecto el valor all
      
      this.productService.findAll().subscribe(
        (data:any)=>{
          this.productList = data;
        },error=>{
          Swal.fire("Error al buscar los productos","","error");
        }
      );
      this.promService.findAll().subscribe(
        (data:any)=>{
          this.promList = data;
        },error=>{
          Swal.fire("Error al buscar las promociones","","error");
        }
      )
    })
  }
}
