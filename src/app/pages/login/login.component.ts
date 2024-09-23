import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": "",
    "password": ""
  }
  constructor(private snack: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == "" || this.loginData.username == null) {
      this.snack.open("El nombre de usuario es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition:"top"
      })
      return ;
    }
    if (this.loginData.password.trim() == "" || this.loginData.password == null) {
      this.snack.open("La contraseña es requerida", "Aceptar", {
        duration: 3000,
        verticalPosition:"top"
      })
      return ;
    }
    this.loginService.login(this.loginData).subscribe(
      (data:any)=>{
        this.loginService.responseToken(data.jwt);

        this.loginService.getCurrentUser(data.username).subscribe((user:any)=>{
          this.loginService.setUser(user);

          if(this.loginService.getUserRole() == "ADMIN"){
            window.location.href="/admin";
          }else if(this.loginService.getUserRole() == "TEACH" || this.loginService.getUserRole() == "FATHER"){
            window.location.href="/user/all";
          }else{
            this.loginService.logOut();
          }
        }) 
      },error =>{
        console.error(error);
        this.snack.open("No fue posible la validacion, intente nuevamente","Aceptar",{
          duration:3000,
          verticalPosition:"top"
        })
      }
    ); 

  }

}
