// src/app/citas/citas.component.ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { AuthService } from '../services/auth.service'; // Ya está importado
import { Notify } from 'notiflix'; // Asegúrate de importar Notify

export interface Cita {
  paciente: {
    nombres: string;
    edad: number;
    telefono: string;
    correo: string;
  };
  cita: {
    motivo: string;
    fecha: string;
  };
  fechaRegistro: string;
  id: number; // Adding an ID for easier management
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nombres',
    'telefono',
    'correo',
    'motivo',
    'fecha',
    'acciones',
  ];
  dataSource: MatTableDataSource<Cita>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use ! to assert non-null
  @ViewChild(MatSort) sort!: MatSort; // Use ! to assert non-null

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService, // Inyecta AuthService
    private router: Router // Inyecta Router
  ) {
    // Load citas from localStorage
    const citas = JSON.parse(localStorage.getItem('citas') || '[]');
    // Add an ID to each cita for tracking
    this.dataSource = new MatTableDataSource(
      citas.map((cita: Cita, index: number) => ({ ...cita, id: index + 1 }))
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    Notify.success('Sesión cerrada exitosamente', {
      timeout: 3000,
      position: 'center-top',
      cssAnimationStyle: 'zoom',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCita(cita: Cita) {
    console.log('Edit cita:', cita);
    this.snackBar.open('Editar cita no implementado aún', 'Cerrar', {
      duration: 3000,
    });
  }

  deleteCita(cita: Cita) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { cita },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const citas = JSON.parse(localStorage.getItem('citas') || '[]');
        const updatedCitas = citas.filter(
          (c: Cita) => c.fechaRegistro !== cita.fechaRegistro
        );
        localStorage.setItem('citas', JSON.stringify(updatedCitas));
        this.dataSource.data = updatedCitas.map((c: Cita, index: number) => ({
          ...c,
          id: index + 1,
        }));
        this.snackBar.open('Cita eliminada exitosamente', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
