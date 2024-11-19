import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CartService } from "../../services/cart.service"; // Servicio del carrito
import { ProductService } from "../../services/product.service"; // Servicio de productos
import { Product } from "../../models/product.model"; // Modelo del producto
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  layout: "list" | "grid" = "grid";
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Carga los productos desde el servicio
  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });
  }

  // Agregar producto al carrito
  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.snackBar.open("Producto agregado al carrito", "Cerrar", {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error("Error al agregar al carrito:", err);
        this.snackBar.open(
          "No se pudo agregar el producto al carrito.",
          "Cerrar",
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
