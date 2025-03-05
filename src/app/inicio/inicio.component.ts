// inicio.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Notify } from 'notiflix';
import { NavComponent } from '../nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClient

interface Review {
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    NavComponent,
    HttpClientModule, // Añade HttpClientModule
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'], // Corrige "styleUrl" a "styleUrls"
})
export class InicioComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    // Realiza la solicitud a RandomUser.me para obtener 3 usuarios aleatorios
    this.http.get<any>('https://randomuser.me/api/?results=3').subscribe({
      next: (data) => {
        this.reviews = data.results; // Asigna los resultados a la variable reviews
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
        Notify.failure('No se pudieron cargar las reseñas', {
          timeout: 3000,
          position: 'center-top',
          cssAnimationStyle: 'zoom',
        });
      },
    });
  }
}
