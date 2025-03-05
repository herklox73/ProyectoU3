// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserEmail: string | null = null;

  constructor(private router: Router) {
    // Al iniciar el servicio, verifica si hay un usuario logueado en localStorage
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  }

  // Verifica si hay un usuario logueado
  isLoggedIn(): boolean {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    // Está logueado si hay un email en localStorage y hay clientes registrados
    return !!this.loggedInUserEmail && clientes.length > 0;
  }

  // Inicia sesión y guarda el estado en localStorage
  login(correo: string, contrasena: string): boolean {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const clienteEncontrado = clientes.find(
      (cliente: any) =>
        cliente.correo === correo && cliente.contrasena === contrasena
    );
    if (clienteEncontrado) {
      this.loggedInUserEmail = correo;
      localStorage.setItem('loggedInUserEmail', correo); // Guardar el email del usuario logueado
      return true;
    }
    return false;
  }

  // Cierra sesión y elimina el estado de localStorage
  logout(): void {
    this.loggedInUserEmail = null;
    localStorage.removeItem('loggedInUserEmail'); // Eliminar el email del usuario logueado
    this.router.navigate(['/login']);
  }

  // Obtiene el correo del usuario logueado
  getLoggedInUserEmail(): string | null {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    if (this.isLoggedIn() && clientes.length > 0) {
      return this.loggedInUserEmail; // Devuelve el email almacenado
    }
    return null;
  }
}
