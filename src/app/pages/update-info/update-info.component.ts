import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.css'
})
export class UpdateInfoComponent implements OnInit{

  user:any;
  role:any;
  userLogin:any;

  constructor(private loginService:LoginService,private userService:UserService){}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.validatePassword();
  }
  public validatePassword(){
    Swal.fire({
      title:'Ingrese su contraseña',
      input:"password",
      text:'Para actualizar la info del usuario es necesario validar su contraseña',
      cancelButtonText:'Cancelar',
      confirmButtonText:'Aceptar',
      showCancelButton:true,
      allowOutsideClick: false,
    }).then((result:any)=>{
      if(result.value == ''){
        Swal.fire("","Ingrese un valor valido","warning");
        this.validatePassword();
      }else if(result.isConfirmed && result.value != ''){
        this.userLogin = {
          "username":this.user.username,
          "password":result.value
        }
        
        this.loginService.login(this.userLogin).subscribe(
          (data:any)=>{
            this.user.password = result.value;
          },error =>{
            Swal.fire("Error","Intente nuevamente","error");
            this.validatePassword();
          }
        )
      }else{
        this.routerUser();
      }
        
    })
  }
  public routerUser(){
    if(this.user.roles[0].roleEnum == "USER"){
      window.location.href =`/user/profile`;
    }
    window.location.href =`/admin/profile`;
  }
  public formSubmit(){
    /* for(let prop in this.user){
      if(this.user[prop] == this.user.roles){
        this.validateForm(this.user.roles[0].roleEnum)
      }else{
        this.validateForm(this.user[prop])
      }  
    } */
    if(this.validateForm(this.user)){
      this.updateInfo(this.user);
    }
  }
  public validateForm(user:any){
    for(let input in user){
      if(this.user[input] == this.user.roles){
        if(this.user.roles[0].roleEnum == null || this.user.roles[0].roleEnum == ''){
          Swal.fire("","Complete todos los campos","warning");
          return false
        }
      }
      if(user[input] == null || user[input] == ''){
        Swal.fire("","Complete todos los campos","warning");
        return false
      }
    }
    return true;
  }
  public updateInfo(user:any){
    this.userService.updateUser(user,user.id).subscribe(
      (data:any)=>{
        this.userLogin = {
          "username":data.username,
          "password":data.password
        }
        this.loginService.logOut();
        this.loginService.login(this.userLogin).subscribe(
          (data:any)=>{
            this.loginService.responseToken(data.jwt);
            this.loginService.getCurrentUser(data.username).subscribe((user:any)=>{
              this.loginService.setUser(user);
              this.routerUser();
              Swal.fire("Usuario actualizado correctamente", "", "success");
            })
          },error =>{
            Swal.fire("Error","Intente nuevamente","error")
          }
        )
      }
    )
  }
}
