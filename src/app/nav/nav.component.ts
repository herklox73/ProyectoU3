// src/app/nav/nav.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service'; // Importa el AuthService
import { Notify } from 'notiflix'; // Importa Notify para las notificaciones

@Component({
  selector: 'app-nav',
  standalone: true, // Añadido para que sea compatible con standalone components
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    private authService: AuthService, // Inyecta el AuthService
    private router: Router // Inyecta el Router
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Verifica si el usuario está logueado
  }

  logout(): void {
    this.authService.logout(); // Cierra la sesión
    this.router.navigate(['/login']); // Redirige al login
    Notify.success('Sesión cerrada exitosamente', {
      timeout: 3000,
      position: 'center-top',
      cssAnimationStyle: 'zoom',
    });
  }
}
