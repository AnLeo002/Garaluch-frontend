import { Component, OnInit } from '@angular/core';
import { PromService } from '../../../services/prom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MethodsService } from '../../../services/methods.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-prom',
  templateUrl: './update-prom.component.html',
  styleUrl: './update-prom.component.css'
})
export class UpdatePromComponent implements OnInit{

  prom:any;
  productName:any=[];

  constructor(private promService:PromService,private route:ActivatedRoute, private methods:MethodsService,private router:Router){

  }
  ngOnInit(): void {
    this.promService.findPromById(this.route.snapshot.params['id']).subscribe(
      (data:any)=>{
        this.prom = data;
        console.log(data)
      }
    )
  }
  formSubmit(){
    if(this.prom.productEntities.length == 0){
      console.log("nose");
      delete this.prom.productEntities;
      console.log(this.prom);
    }else{
      for(let pro of this.prom.productEntities){
      this.productName.push(pro.name);
      console.log(this.productName);
      
    }
    this.prom.productEntities = this.productName;
    }
    

    if(this.methods.validateForm(this.prom)){
      this.promService.updateProm(this.prom,this.prom.id).subscribe(
        (data:any)=>{
          Swal.fire("Promoción actualizada correctamente","","success");
          this.router.navigate(['/admin/proms']);
        },error=>{
          Swal.fire("Error al actualizar la promoción","","error");
        }
      )
    }
  }

}
