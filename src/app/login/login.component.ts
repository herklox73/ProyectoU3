// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Añadimos ActivatedRoute
import { Notify } from 'notiflix';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Importamos el servicio
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NavComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Para obtener el returnUrl
    private authService: AuthService // Inyectamos el AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.authService.isLoggedIn()) {
      const returnUrl =
        this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigate([returnUrl]);
    }
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;

      if (this.authService.login(correo, contrasena)) {
        Notify.success('¡Inicio de sesión exitoso!', {
          timeout: 3000,
          position: 'center-top',
          cssAnimationStyle: 'zoom',
        });

        // Obtener la URL a la que el usuario quería ir (si existe)
        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]); // Redirige a la ruta original o a un default
      } else {
        Notify.failure('Correo o contraseña incorrectos.', {
          timeout: 3000,
          position: 'center-top',
          cssAnimationStyle: 'zoom',
        });
      }
    } else {
      Notify.warning('Por favor, completa todos los campos correctamente.', {
        timeout: 3000,
        position: 'center-top',
        cssAnimationStyle: 'zoom',
      });
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field === 'correo' && control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field === 'contrasena' && control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  updateErrorMessage(field: string) {
    this.getErrorMessage(field);
  }

  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  onRegisterClick() {
    console.log('Enlace de registro clicado');
    this.router.navigate(['/registro']);
  }
}
