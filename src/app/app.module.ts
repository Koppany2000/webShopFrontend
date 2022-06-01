import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/card/card.component';
import {PaginationComponent} from './parts/pagination/pagination.component';
import { NavigationComponent } from './parts/navigation/navigation.component';
import {CookieService} from "ngx-cookie-service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { JwtInterceptor } from './_interceptors/jwt-interceptor.service';
import { ErrorInterceptor } from './_interceptors/error-interceptor.service';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductDeleteComponent } from './pages/product-delete/product-delete.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
    NavigationComponent,
    ProductDetailComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    UserEditComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductDeleteComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NzCheckboxModule,
    CommonModule
  ],
  providers: [CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
bootstrap: [AppComponent]
})
export class AppModule { }
