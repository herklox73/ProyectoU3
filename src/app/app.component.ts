import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarComponent } from './agendar/agendar.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AgendarComponent,
    InicioComponent,
    LoginComponent,
    NavComponent,
    RegistroComponent,
    RouterModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'proyectoPWA';
}
