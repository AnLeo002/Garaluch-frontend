import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { InfoComponent } from './pages/info/info.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { StartComponent } from './pages/user/start/start.component';
import { UpdateInfoComponent } from './pages/update-info/update-info.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { AddPromComponent } from './pages/admin/add-prom/add-prom.component';
import { PromsComponent } from './pages/admin/proms/proms.component';
import { UpdatePromComponent } from './pages/admin/update-prom/update-prom.component';
import { AddProductsPromComponent } from './pages/admin/add-products-prom/add-products-prom.component';
import { ProductsPromComponent } from './pages/admin/products-prom/products-prom.component';
import { ShoppingCartComponent } from './pages/user/shopping-cart/shopping-cart.component';
import { InvoicesComponent } from './pages/user/invoices/invoices.component';
import { ViewInvoiceComponent } from './pages/user/view-invoice/view-invoice.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent,
  pathMatch:'full'
},{
  path:'signup',
  component:SignupComponent,
  pathMatch:'full'
},{
  path:'login',
  component:LoginComponent,
  pathMatch:'full'
},{
  path:'info/:id/:refer',
  component:InfoComponent,
  pathMatch:'full'
},{
  path:'admin',
  component:DashboardComponent,
  canActivate:[AdminGuard],
  children:[
    {
      path:'profile',
      component:ProfileComponent
    },{
      path:'add-product',
      component:AddProductComponent
    },{
      path:'update-profile',
      component:UpdateInfoComponent
    },{
      path:'',
      component:WelcomeComponent
    },{
      path:'products',
      component:ProductsComponent
    },{
      path:'add-category',
      component:AddCategoryComponent
    },{
      path:'categories',
      component:CategoriesComponent
    },{
      path:'update-product/:id',
      component:UpdateProductComponent
    },{
      path:'update-category/:id',
      component:UpdateCategoryComponent
    },{
      path:'add-prom',
      component:AddPromComponent
    },{
      path:'proms',
      component:PromsComponent
    },{
      path:'update-prom/:id',
      component:UpdatePromComponent
    },{
      path:'add-products-prom/:promId',
      component:AddProductsPromComponent
    },{
      path:'products/:promId',
      component:ProductsPromComponent
    }
  ]
},{
  path:'user',
  component:UserDashboardComponent,
  canActivate:[UserGuard],
  children:[
    {
      path:'profile',
      component:ProfileComponent
    },{
      path:'',
      component:StartComponent
    },{
      path:'update-profile',
      component:UpdateInfoComponent
    },{
      path:'info/:id/:refer',
      component:InfoComponent,
      runGuardsAndResolvers: 'paramsChange'
    },{
      path:'shopping-cart',
      component:ShoppingCartComponent
    },{
      path:'invoices',
      component:InvoicesComponent//Si ponemos el componente despues de la direccion de abajo, el componente no se lee
    },{
      path:'invoice/:id',
      component:ViewInvoiceComponent
    },{
      path:':filter',//Este componente mostrara solo productos o promociones
      component:StartComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
