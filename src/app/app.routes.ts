import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from "./components/cart/cart.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AuthComponent } from "./components/auth/auth.component";
import { UploadProductComponent } from "./components/upload-product/upload-product.component";
import { CheckoutComponent } from "./components/checkout/checkout.component"; // Importa el componente de checkout

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductListComponent }, // Ruta para el listado de productos
  { path: "products/:id", component: ProductDetailsComponent }, // Ruta para los detalles del producto
  { path: "cart", component: CartComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "auth", component: AuthComponent },
  { path: "search", component: SearchResultsComponent },
  { path: "upload-product", component: UploadProductComponent }, // Ruta para subir productos
  { path: "checkout", component: CheckoutComponent }, // Ruta para el checkout
  { path: "**", redirectTo: "home" }, // Redirige cualquier ruta desconocida al home
];
