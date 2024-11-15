import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

declare var MercadoPago: any;

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Cargar los items del carrito desde el servicio
    this.cartService.getCart().subscribe(
      (data) => {
        const items = data.CartItems || [];
        this.cartItems = [];

        // Obtener los detalles de cada producto basado en su ID
        items.forEach((item: any) => {
          this.productService.getProductById(item.productId).subscribe(
            (product) => {
              this.cartItems.push({ ...product, quantity: item.quantity });
              this.calculateTotalPrice(); // Calcula el total después de añadir cada producto
            },
            (error) => console.error("Error al obtener el producto:", error)
          );
        });
      },
      (error) => console.error("Error al cargar el carrito:", error)
    );
  }

  calculateTotalPrice(): void {
    // Calcula el total sumando el precio de cada producto multiplicado por su cantidad
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  createPreference(): void {
    const preference = {
      items: this.cartItems.map((item) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      })),
      back_urls: {
        success: "https://tusitio.com/success",
        failure: "https://tusitio.com/failure",
        pending: "https://tusitio.com/pending",
      },
      auto_return: "approved",
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer APP_USR-2074745442746812-111510-b1305fe7306f6dbfe08f48e9e9a6acb8-209950274`, // Reemplaza con tu Access Token
    });

    this.http
      .post("https://api.mercadopago.com/checkout/preferences", preference, {
        headers,
      })
      .subscribe(
        (response: any) => {
          this.initializeMercadoPago(response.id);
        },
        (error) => {
          console.error("Error al crear la preferencia:", error);
        }
      );
  }

  initializeMercadoPago(preferenceId: string): void {
    const mp = new MercadoPago("APP_USR-deaedcf4-a1ae-4e3c-bb53-0bac4fed6df1", {
      locale: "es-AR",
    }); // Reemplaza con tu Public Key
    mp.bricks().create("wallet", "wallet_container", {
      initialization: { preferenceId: preferenceId },
    });
  }
}
