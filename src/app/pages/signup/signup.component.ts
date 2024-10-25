import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  public user: any = {
    name: "",
    lastName: "",
    username: "",
    password: "",
    tel: "",
    email: "",
    roleRequest: {
      roleListName: [""]
    }
  }
  constructor(private userService: UserService, private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
  }
  formSubmit() {
      if (this.isEmpty(this.user)) {
        this.snack.open('Complete todos los campos solicitados', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        return;

      }
    
    this.userService.registerUser(this.user).subscribe((data: any) => {
      this.loginService.responseToken(data.jwt);
      this.loginService.getCurrentUser(data.username).subscribe(
        (user) => {
          this.loginService.setUser(user);
          window.location.href="/user";
          Swal.fire("Usuario creado", "Usuario creado Correctamente", "success");
          
        })
    }, error => {
      if (error.status == 409) {
        Swal.fire("Nombre de usuario existente", "Por favor cambie el nombre de usuario", "error");
      }
    })
  }
  isEmpty(object:any) {
    for (let i in object) {
      if (object[i] == "" || object[i] == null) {
        return true;
      }
      if (object.roleRequest && (object.roleRequest.roleListName[0] == '' || object.roleRequest.roleListName[0] == null)) {
        return true;
      }
    }
    return false;
  }

}
