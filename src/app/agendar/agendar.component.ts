// src/app/agendar/agendar.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Notify } from 'notiflix';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css'],
})
export class AgendarComponent implements OnInit {
  agendarForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.agendarForm = this.fb.group({
      nombres: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z\\s]+'),
        ],
      ],
      edad: [, [Validators.required, Validators.min(1), Validators.max(120)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      correo: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userEmail = this.authService.getLoggedInUserEmail();
    if (userEmail) {
      this.agendarForm.patchValue({ correo: userEmail });
    }
  }

  get minDate(): Date {
    return new Date();
  }

  agendarCita() {
    if (this.agendarForm.valid) {
      const { nombres, edad, telefono, correo, motivo, fecha } =
        this.agendarForm.value;
      const citas = JSON.parse(localStorage.getItem('citas') || '[]');
      citas.push({
        paciente: { nombres, edad, telefono, correo },
        cita: { motivo, fecha: fecha.toISOString().split('T')[0] },
        fechaRegistro: new Date().toISOString(),
      });
      localStorage.setItem('citas', JSON.stringify(citas));
      console.log('Cita agendada:', this.agendarForm.value);

      Notify.success('Cita agendada exitosamente', {
        timeout: 3000,
        position: 'center-top',
        cssAnimationStyle: 'zoom',
      });

      this.resetForm();
    }
  }

  cancelarCita() {
    this.resetForm();
    Notify.info('Cita cancelada', {
      timeout: 3000,
      position: 'center-top',
      cssAnimationStyle: 'zoom',
    });
  }

  private resetForm() {
    this.agendarForm.reset({ correo: this.agendarForm.get('correo')?.value });
  }

  getErrorMessage(field: string): string {
    const control = this.agendarForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field === 'nombres') {
      if (control?.hasError('minlength'))
        return 'Deben tener al menos 2 caracteres';
      if (control?.hasError('pattern'))
        return 'Solo se permiten letras y espacios';
    }
    if (field === 'edad') {
      if (control?.hasError('min')) return 'La edad debe ser mayor a 0';
      if (control?.hasError('max')) return 'La edad no puede ser mayor a 120';
    }
    if (field === 'telefono' && control?.hasError('pattern')) {
      return 'Debe ser un número de 10 dígitos';
    }
    if (field === 'correo' && control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (field === 'fecha' && control?.hasError('matDatepickerMin')) {
      return 'La fecha no puede ser anterior a hoy';
    }
    return '';
  }
}
