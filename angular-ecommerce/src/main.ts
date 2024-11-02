// src/main.ts

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Componentes principales
import { AppComponent } from './app/app.component';
import { AuthComponent } from './app/components/auth/auth.component';
import { HomeComponent } from './app/components/home/home.component';
import { UserProfileComponent } from './app/components/user-profile/user-profile.component';

// Componentes de productos
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductDetailsComponent } from './app/components/product-details/product-details.component';

// Define las rutas de la aplicación
const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'auth', component: AuthComponent }, // Ruta para autenticación (login y registro)
  { path: 'user-profile', component: UserProfileComponent }, // Ruta para el perfil del usuario
  { path: 'products', component: ProductListComponent }, // Ruta para la lista de productos
  { path: 'products/:id', component: ProductDetailsComponent }, // Ruta para los detalles de un producto específico
  { path: '**', redirectTo: '' }, // Redirección para rutas no encontradas
];

// Inicializa la aplicación sin un módulo raíz (standalone)
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configura las rutas de la aplicación
    provideHttpClient(), // Proporciona el servicio HTTP en toda la aplicación
  ],
}).catch((err) => console.error(err)); // Maneja cualquier error de inicialización
