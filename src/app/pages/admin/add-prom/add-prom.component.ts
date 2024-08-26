import { Component } from '@angular/core';
import { PromService } from '../../../services/prom.service';
import { MethodsService } from '../../../services/methods.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prom',
  templateUrl: './add-prom.component.html',
  styleUrl: './add-prom.component.css'
})
export class AddPromComponent {

  prom:any = {
    name:'',
    description:'',
    startDate:'',
    endDate:'',
    price:'',
    amount:'',
    url:''
  }
  constructor(private promService:PromService,private method:MethodsService,private router:Router) {
    
  }
  public formSubmit(){
    this.prom.startDate = this.method.transformDate(this.prom.startDate);
    this.prom.endDate = this.method.transformDate(this.prom.endDate);
    if(this.method.validateForm(this.prom)){
      this.promService.saveProm(this.prom).subscribe(
        (data:any)=>{
          Swal.fire("Promoción guardada con exito","","success");
          this.router.navigate(['/admin/proms'])
        },error=>{
          Swal.fire("Error al guardar la promoción","","error")
        }
      )
    }
    
  }
}
