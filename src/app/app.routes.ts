import { Routes } from '@angular/router';
import { NotFound } from './shared/components';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/movies/dashboard/dashboard').then(c => c.Dashboard)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-us/about-us').then(c => c.AboutUs)
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./features/contact-us/contact-us').then(c => c.ContactUs)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./features/auth/sign-up/sign-up').then(c => c.SignUp)
  },
  {
    path: '**',
    component: NotFound
  }
];
