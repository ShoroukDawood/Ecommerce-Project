import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';

export const routes: Routes = [
  {
    path: "", 
    component: AuthLayoutComponent,
    canActivate: [checkTokenGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent),
        title: "Login"
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent),
        title: "Register"
      }
    ]
  },
  {
    path: "", 
    component: MainLayoutComponent, 
    children: [
      { path: 'home', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
      { path: 'productDetails/:id', loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent), title: 'Product Details' },
      { path: 'categoryDetails/:id', loadComponent: () => import('./features/pages/categoryDetails/category-details.component').then(c => c.CategoryDetailsComponent), title: 'Category Details' },
      { path: 'brandDetails/:id', loadComponent: () => import('./features/pages/specificBrands/specific-brands/specific-brands.component').then(c => c.SpecificBrandsComponent), title: 'Brand Details' },
      { path: 'cart', loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent), canActivate: [authGuard], title: 'Cart' },
      { path: 'allorders', loadComponent: () => import('./features/pages/all-ordrers/all-ordrers.component').then(c => c.AllOrdrersComponent), canActivate: [authGuard], title: 'All Orders' },
      { path: 'checkout/:id', loadComponent: () => import('./features/pages/chechout/chechout.component').then(c => c.ChechoutComponent), canActivate: [authGuard], title: 'Checkout' },
      { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent), title: 'Products' },
      { path: 'resetpassword', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent), title: 'Reset Password' },
      { path: 'brands', loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent), title: 'Brands' },
      { path: 'categories', loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent), title: 'Categories' }
    ]
  }
];
