import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-auth",
  standalone: true, // Este es esencial para componentes standalone
  imports: [FormsModule, CommonModule], // Asegúrate de que FormsModule esté importado
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  email = "";
  password = "";
  username = "";
  isLoginMode = true;
  errorMessage = "";
  successMessage = ""; // Variable para el mensaje de éxito

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = "";
    this.successMessage = ""; // Reiniciar mensaje al cambiar de modo
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.userService.login(this.email, this.password).subscribe(
        (response) => {
          // Validar que se recibió el token
          if (response?.token) {
            this.successMessage = "Inicio de sesión exitoso";
            this.errorMessage = ""; // Limpiar mensajes de error
            this.router.navigate(["/"]); // Redirigir al home
          } else {
            this.errorMessage =
              "No se recibió un token. Verifique su conexión.";
            this.successMessage = "";
          }
        },
        (error) => {
          // Manejar errores del login
          this.errorMessage =
            error.message || "Usuario o contraseña incorrectos.";
          this.successMessage = "";
        }
      );
    } else {
      // Lógica de registro
      this.userService
        .createUser(this.username, this.email, this.password)
        .subscribe(
          () => {
            this.successMessage = "Cuenta creada correctamente";
            this.errorMessage = "";
            this.isLoginMode = true; // Cambiar a modo login
          },
          (error) => {
            this.errorMessage = "Error al crear la cuenta. Intente nuevamente.";
            this.successMessage = "";
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }
}
