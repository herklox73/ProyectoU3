// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AgendarComponent } from './agendar/agendar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'agendar', component: AgendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
];
