import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router"; // Importa RouterModule
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Asegúrate de incluir RouterModule aquí
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Para almacenar los productos completos con cantidad
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService // Inyecta el servicio de productos
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Obtiene los items del carrito (solo productId y quantity)
    this.cartService.getCart().subscribe(
      (data) => {
        const items = data.CartItems || [];
        this.cartItems = []; // Limpiamos cualquier valor previo

        // Por cada item en el carrito, obtener el producto completo
        items.forEach((item: any) => {
          this.productService.getProductById(item.productId).subscribe(
            (product) => {
              // Agrega el producto completo al array junto con la cantidad
              this.cartItems.push({ ...product, quantity: item.quantity });
              this.calculateTotalPrice(); // Calcula el total después de agregar el producto
            },
            (error) => {
              console.error(
                `Error al obtener el producto con ID ${item.productId}:`,
                error
              );
            }
          );
        });
      },
      (error) => {
        console.error("Error al cargar el carrito:", error);
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== cartItemId);
      this.calculateTotalPrice();
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) return; // Validación para no permitir cantidades menores a 1
    this.cartService.updateCartItem(cartItemId, quantity).subscribe(() => {
      const item = this.cartItems.find((item) => item.id === cartItemId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotalPrice();
      }
    });
  }
}
