import { Component, OnInit } from '@angular/core';
import { PromService } from '../../../services/prom.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-prom',
  templateUrl: './products-prom.component.html',
  styleUrl: './products-prom.component.css'
})
export class ProductsPromComponent implements OnInit {

  promId: any;
  productEntities:any = null;

  constructor(private promService:PromService,private route:ActivatedRoute) {  
  }
  ngOnInit(): void {

    this.promId = this.route.snapshot.params['promId'];
    this.promService.findPromById(this.promId).subscribe(
      (data:any)=>{
        this.productEntities = data.productEntities;
        console.log(this.productEntities)
      })
  }
  public deleteElement(id:any,string:string){

  }
}
