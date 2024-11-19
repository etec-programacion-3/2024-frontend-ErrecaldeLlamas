import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, Routes } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations"; // Animaciones
import { importProvidersFrom } from "@angular/core"; // Importa proveedores para Angular Material

// Componentes principales
import { AppComponent } from "./app/app.component";
import { AuthComponent } from "./app/components/auth/auth.component";
import { HomeComponent } from "./app/components/home/home.component";
import { UserProfileComponent } from "./app/components/user-profile/user-profile.component";
import { ProductListComponent } from "./app/components/product-list/product-list.component";
import { ProductDetailsComponent } from "./app/components/product-details/product-details.component";
import { CartComponent } from "./app/components/cart/cart.component";
import { SearchResultsComponent } from "./app/components/search-results/search-results.component";
import { UploadProductComponent } from "./app/components/upload-product/upload-product.component";
import { CheckoutComponent } from "./app/components/checkout/checkout.component";

// Módulos de Angular Material necesarios
import { MatDialogModule } from "@angular/material/dialog"; // Para modales
import { MatSnackBarModule } from "@angular/material/snack-bar"; // Para notificaciones
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // Para animaciones
import { CookieService } from "ngx-cookie-service"; // Servicio de cookies

// Define las rutas de la aplicación
const routes: Routes = [
  { path: "", component: HomeComponent }, // Ruta para la página de inicio
  { path: "auth", component: AuthComponent }, // Ruta para autenticación (login y registro)
  { path: "user-profile", component: UserProfileComponent }, // Ruta para el perfil del usuario
  { path: "products", component: ProductListComponent }, // Ruta para la lista de productos
  { path: "products/:id", component: ProductDetailsComponent }, // Ruta para los detalles de un producto específico
  { path: "cart", component: CartComponent }, // Ruta para el carrito
  { path: "search", component: SearchResultsComponent }, // Ruta para los resultados de búsqueda
  { path: "upload-product", component: UploadProductComponent }, // Ruta para subir productos
  { path: "checkout", component: CheckoutComponent }, // Ruta para el checkout
  { path: "**", redirectTo: "" }, // Redirección para rutas no encontradas
];

// Inicializa la aplicación sin un módulo raíz (standalone)
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configura las rutas de la aplicación
    provideHttpClient(), // Proporciona el servicio HTTP en toda la aplicación
    provideAnimations(), // Habilita animaciones
    importProvidersFrom(
      MatDialogModule, // Modales
      MatSnackBarModule, // Notificaciones
      BrowserAnimationsModule // Animaciones del navegador
    ),
    CookieService, // Servicio para manejo de cookies
  ],
}).catch((err) => console.error("Error al inicializar la aplicación:", err));
