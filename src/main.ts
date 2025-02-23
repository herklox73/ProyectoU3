import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/ngsw-worker.js')
      .then((registration) => {
        console.log(' Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error(' Error en el registro del Service Worker:', error);
      });
  });
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(' Error al inicializar la app:', err));
