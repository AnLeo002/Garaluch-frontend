import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { FooterComponent } from './components/footer/footer.component';
import { authInceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
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
import { ViewInvoiceComponent } from './pages/user/view-invoice/view-invoice.component';
import { InvoicesComponent } from './pages/user/invoices/invoices.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    InfoComponent,
    FooterComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    AddProductComponent,
    WelcomeComponent,
    StartComponent,
    UpdateInfoComponent,
    ProductsComponent,
    AddCategoryComponent,
    CategoriesComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    AddPromComponent,
    PromsComponent,
    UpdatePromComponent,
    AddProductsPromComponent,
    ProductsPromComponent,
    ShoppingCartComponent,
    ViewInvoiceComponent,
    InvoicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,//Modulo necesario para poder usar el calendario en un input
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
  ],
  providers: [
    authInceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
