import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service"; // Importa el CartService
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  errorMessage: string = "";
  successMessage: string = ""; // Variable para mensaje de éxito

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService // Inyecta el CartService
  ) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get("id");
    if (productId) {
      this.productService.getProductById(+productId).subscribe(
        (data) => {
          this.product = data;
          console.log(`Imagen URL: ${this.product.imageUrl}`); // Verifica si el nombre del archivo es correcto
        },
        (error) => {
          this.errorMessage = "No se pudo cargar el producto.";
        }
      );
    }
  }

  // Método para agregar el producto al carrito
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, 1).subscribe(
        () => {
          this.successMessage = "Producto agregado al carrito exitosamente.";
          setTimeout(() => (this.successMessage = ""), 3000); // Oculta el mensaje después de 3 segundos
        },
        (error) => {
          this.errorMessage = "No se pudo agregar el producto al carrito.";
        }
      );
    }
  }
}
