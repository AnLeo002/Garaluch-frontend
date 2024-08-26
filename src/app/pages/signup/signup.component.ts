import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  public user ={
    name:"",
    lastName:"",
    username:"",
    password:"",
    tel:"",
    email:"",
    roleRequest:{
      roleListName:[""]
    }
  }
  constructor(private userService:UserService, private snack:MatSnackBar,private loginService:LoginService){}
  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username =='' || this.user.username == null || 
    this.user.name =='' || this.user.name == null ||
    this.user.lastName =='' || this.user.lastName == null ||
    this.user.tel =='' || this.user.tel == null ||
    this.user.email =='' || this.user.email == null ||
    this.user.password =='' || this.user.password == null || this.user.roleRequest.roleListName[0] =='' || this.user.roleRequest.roleListName[0] == null){
      this.snack.open('Complete todos los campos solicitados','Aceptar',{
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }

    this.userService.registerUser(this.user).subscribe((data:any)=>{
      this.loginService.responseToken(data.jwt);
      this.loginService.getCurrentUser(data.username).subscribe(
        (user)=>{
          this.loginService.setUser(user);
          Swal.fire("Usuario creado","Usuario creado Correctamente","success");
      })
    },error=>{
      if(error.status == 409){
        Swal.fire("Nombre de usuario existente","Por favor cambie el nombre de usuario","error"); 
      }
    })
  }

}
