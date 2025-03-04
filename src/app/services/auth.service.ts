// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {}

  // Verifica si hay un usuario logueado revisando localStorage
  isLoggedIn(): boolean {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    return this.loggedIn && clientes.length > 0; // Solo consideramos logueado si hay clientes y se ha autenticado
  }

  // Establece el estado de login
  login(correo: string, contrasena: string): boolean {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const clienteEncontrado = clientes.find(
      (cliente: any) =>
        cliente.correo === correo && cliente.contrasena === contrasena
    );
    if (clienteEncontrado) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  // Cierra sesión
  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  // Obtiene el correo del usuario logueado (opcional, para prellenar datos)
  getLoggedInUserEmail(): string | null {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    if (this.loggedIn && clientes.length > 0) {
      return clientes[0].correo; // Simplificación: toma el primer usuario registrado
    }
    return null;
  }
}
