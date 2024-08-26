import { Component, OnInit } from '@angular/core';
import { PromService } from '../../../services/prom.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proms',
  templateUrl: './proms.component.html',
  styleUrl: './proms.component.css'
})
export class PromsComponent implements OnInit{

  userLogin:any;
  promList:any;
  user:any;

  constructor(private promService:PromService, private login:LoginService, private router:Router){}

  ngOnInit(): void {

    this.user = this.login.getUser();
    this.promService.findAll().subscribe(
      (data:any)=>{
        this.promList = data;
      }
    )
  }
  deleteElement(id:any,string:string){
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
                this.promService.deleteProm(id).subscribe(data=>{
                  Swal.fire("Elemento eliminado correctamente","","success");
                  this.router.navigate(["/admin/proms"])
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
