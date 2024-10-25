// src/main.ts
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ]
})
.catch(err => console.error(err));
