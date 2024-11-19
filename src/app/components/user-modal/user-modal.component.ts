import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.css"],
})
export class UserModalComponent implements OnInit {
  user: any = {};
  cartProducts: any[] = [];
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.cookieService.get("userId");
    if (userId) {
      this.fetchUserData(userId);
      this.fetchCartProducts(userId);
    } else {
      this.loading = false;
      console.error("No se encontró el usuario en las cookies.");
    }
  }

  fetchUserData(userId: string): void {
    this.http.get<any>(`http://localhost:3000/api/users/${userId}`).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error("Error al obtener los datos del usuario:", err);
      },
    });
  }

  fetchCartProducts(userId: string): void {
    this.http
      .get<any[]>(`http://localhost:3000/api/carts/${userId}/products`)
      .subscribe({
        next: (products) => {
          this.cartProducts = products;
          this.loading = false;
        },
        error: (err) => {
          console.error("Error al obtener los productos del carrito:", err);
          this.loading = false;
        },
      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.cookieService.deleteAll(); // Borra todas las cookies
    this.closeModal(); // Cierra el modal
    this.router.navigate(["/auth"]); // Redirige a la página de autenticación
  }
}
