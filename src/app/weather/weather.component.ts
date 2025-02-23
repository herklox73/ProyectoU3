import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [WeatherService], // ✅ Se agrega el servicio aquí
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  city = 'Quito';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(
          '✅ Datos del clima recibidos:',
          JSON.stringify(this.weatherData, null, 2)
        );
      },
      error: (error) => {
        console.error('❌ Error obteniendo datos del clima:', error);
      },
    });
  }
}
