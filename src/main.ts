import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, Routes } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

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
import { CheckoutComponent } from "./app/components/checkout/checkout.component"; // Importa el componente de checkout

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
  ],
}).catch((err) => console.error(err));
