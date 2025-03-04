import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Notify } from 'notiflix';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-registro',
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
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombres: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z\\s]+'),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z\\s]+'),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrar() {
    if (this.registroForm.valid) {
      const cliente = this.registroForm.value;
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
      clientes.push({
        ...cliente,
        fechaRegistro: new Date().toISOString(),
      });
      localStorage.setItem('clientes', JSON.stringify(clientes));

      console.log('Cliente registrado:', cliente);

      Notify.success('¡Registro exitoso!', {
        timeout: 3000,
        position: 'center-top',
        cssAnimationStyle: 'zoom',
      });

      this.resetForm();
    } else {
      Notify.warning('Por favor, completa todos los campos correctamente.', {
        timeout: 3000,
        position: 'center-top',
        cssAnimationStyle: 'zoom',
      });
      this.registroForm.markAllAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registroForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field === 'nombres' || field === 'apellidos') {
      if (control?.hasError('minlength')) {
        return 'Deben tener al menos 2 caracteres';
      }
      if (control?.hasError('pattern')) {
        return 'Solo se permiten letras y espacios';
      }
    }
    if (field === 'correo' && control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field === 'celular' && control?.hasError('pattern')) {
      return 'Debe ser un número de 10 dígitos';
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

  private resetForm() {
    this.registroForm.reset();
  }
}
