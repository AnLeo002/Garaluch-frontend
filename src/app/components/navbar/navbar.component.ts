import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { ShoppingService } from '../../services/shopping.service';
import { ProductService } from '../../services/product.service';
import { PromService } from '../../services/prom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true })//nuestro componente no va a necesitar informacion extra
  sidenav!: MatSidenav;
  role: any;
  user: any = null;
  invoice = {//Este objeto se encargara de guardar el listado de compras en el sessionStorage hasta que el usuario cancele
    username: "",
    total: 0,
    payment: false,
    promInvoiceDTOList: [],
    productInvoiceDTOList: []
  }
  promList: any;
  productList: any;
  amountShopping: any;
  proSearch: string = '';
  totalFind: any[] = []

  constructor(public login: LoginService, private shoppingService: ShoppingService, private productService: ProductService, private promService: PromService, private router: Router) { }

  ngOnInit(): void {

    this.productService.findAll().subscribe((data: any) => {
      this.productService.saveProductsInLocal(data);
    })
    this.promService.findAll().subscribe((data: any) => {
      this.promService.savePromsInLocal(data);
    })

    if (this.login.isLoggedIn()) {
      this.user = this.login.getUser();
      if (this.user.roles[0].roleEnum == "TEACH" || this.user.roles[0].roleEnum == "FATHER") {
        this.role = "user"
        //Se creara una factura vacia al momento de que el usuario se loguee
        this.invoice.username = this.login.getUser().username;
        this.shoppingService.addShoppingInvoice(this.invoice);

        /* this.invoice = this.shoppingService.getShoppingInvoice(); */

        //Suscribirse a cambios en los datos de la factura
        this.shoppingService.currentData.subscribe(data => {
          this.amountShopping = data;
        })
      } else {
        this.role = "admin";
      }
      setTimeout(() => {
        Swal.fire("El tiempo de sesión culminó", "Vuelva a ingresar", "info");
        this.login.logOut();
        this.router.navigate(["/"])
      }, 1800000);

    }

  }
  public logOut() {
    this.login.logOut();
    window.location.reload();
  }
  public searchPro() {
    if (!this.proSearch || this.proSearch.trim() === '') {
      this.totalFind = []; // Vaciar resultados si la búsqueda está vacía
      return;
    }
      this.promList = this.promService.getPromsListInLocal()
      .filter((prom: any) => prom.name.toLowerCase().includes(this.proSearch.toLowerCase()));
      this.productList = this.productService.getProdutsListInLocal().filter((product: any) => product.name.toLowerCase().includes(this.proSearch.toLowerCase()));

      this.promList.forEach((prom: any) => 
        prom.id = prom.id.toString().concat("/prom")
      );
      this.productList.forEach((pro: any) => 
        pro.id = pro.id.toString().concat("/product")
      );
      this.totalFind = [...this.promList,...this.productList]
    
  }
  /* console(text: any) {
    console.log(text)
  } */
  deleteFindList() {
    this.proSearch = '';
    this.totalFind = [];
  }
  navigatePro(id: any) {
    this.router.navigate([`/user/info/` + id]).then(()=>{
      this.deleteFindList();
    })
    
  }
}
