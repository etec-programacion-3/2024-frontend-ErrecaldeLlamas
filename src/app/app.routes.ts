import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from "./components/cart/cart.component";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AuthComponent } from "./components/auth/auth.component";
import { UploadProductComponent } from "./components/upload-product/upload-product.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { UserModalComponent } from "./components/user-modal/user-modal.component"; // Importa el modal de usuario

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductListComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "cart", component: CartComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "auth", component: AuthComponent },
  { path: "search", component: SearchResultsComponent },
  { path: "upload-product", component: UploadProductComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "user-modal", component: UserModalComponent }, // Nueva ruta para el modal
  { path: "**", redirectTo: "home" },
];
