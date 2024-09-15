import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @ViewChild(MatSidenav,{static:true})//nuestro componente no va a necesitar informacion extra
  sidenav!:MatSidenav;
  role:any;
  user:any = null;
  invoice = {//Este objeto se encargara de guardar el listado de compras en el sessionStorage hasta que el usuario cancele
    username:"",
    total:0,
    payment:false,
    promInvoiceDTOList:[],
    productInvoiceDTOList:[]     
}
 amountShopping:any;

  constructor(public login:LoginService,private shoppingService:ShoppingService){}

  ngOnInit(): void {
    
    if (this.login.isLoggedIn()) {
      this.user = this.login.getUser();        
          if(this.user.roles[0].roleEnum == "TEACH" || this.user.roles[0].roleEnum == "FATHER"){
            this.role = "user"
            //Se creara una factura vacia al momento de que el usuario se loguee
            this.invoice.username=this.login.getUser().username;
            this.shoppingService.addShoppingInvoice(this.invoice);

            this.invoice = this.shoppingService.getShoppingInvoice();
            
            this.shoppingService.currentData.subscribe(data =>{
              this.amountShopping = data;
            })            
          }else{
            this.role = "admin";
          }
          setTimeout(()=>{
            Swal.fire("El tiempo de sesión culminó","Vuelva a ingresar","info");
            return this.login.logOut();
          },1800000);
      
    }

  }
  public logOut(){
    this.login.logOut();
    window.location.reload();
  }
  
}
