import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', 
})
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = '6e22702503ee5be007e314bc3cab67ff';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`)
      .pipe(
        catchError((error) => {
          console.error(' Error obteniendo datos del clima', error);
          return throwError(
            () => new Error('Error al obtener datos meteorológicos')
          );
        })
      );
  }
}
