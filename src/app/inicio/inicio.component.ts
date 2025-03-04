import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Notify } from 'notiflix';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-inicio',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    NavComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  services = [
    {
      icon: 'tooth',
      title: 'Implantes',
      description: 'Solución permanente para reemplazar dientes perdidos',
    },
    {
      icon: 'teeth',
      title: 'Ortodoncia',
      description: 'Corrección de la posición dental y mejora de la mordida',
    },
    {
      icon: 'tools',
      title: 'Extracciones',
      description: 'Extracciones seguras y sin dolor',
    },
    {
      icon: 'shower',
      title: 'Limpieza Dental',
      description: 'Mantenimiento esencial para tu salud bucal',
    },
    {
      icon: 'star',
      title: 'Blanqueamiento',
      description: 'Sonrisa más brillante y blanca',
    },
    {
      icon: 'smile',
      title: 'Carillas',
      description: 'Mejora estética de tu sonrisa',
    },
  ];
  contacto = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  };

  enviarContacto() {
    console.log('Datos de contacto enviados:', this.contacto);
    Notify.success('¡Mensaje enviado exitosamente!', {
      timeout: 3000,
      position: 'center-top',
      cssAnimationStyle: 'zoom',
    });
    this.resetFormulario();
  }

  private resetFormulario() {
    this.contacto = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    };
  }
}
