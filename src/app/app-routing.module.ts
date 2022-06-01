import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { Role } from './enum/Role';
import { AuthGuard } from './_guards/auth.guard';
import { ProductDeleteComponent } from './pages/product-delete/product-delete.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'product', component: CardComponent},
  {path: 'category', component: CardComponent},
  {path: 'success', component: SignupComponent},
  {path: 'register', component: SignupComponent},
  {path: 'category/:id', component: CardComponent},
  {path: '', redirectTo: '/product', pathMatch: 'full'},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'seller', redirectTo: 'seller/product', pathMatch: 'full'},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
  {path: 'seller/product/:id/new', component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [Role.Employee]}},
  {path: 'seller/product', component: ProductListComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager, Role.Employee]}},
  {path: 'seller/product/add', component: ProductAddComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager, Role.Employee]}},
  {path: 'seller/product/:id/edit', component: ProductEditComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager, Role.Employee]}},
  {path: 'seller/product/delete', component: ProductDeleteComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager, Role.Employee]}},];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
