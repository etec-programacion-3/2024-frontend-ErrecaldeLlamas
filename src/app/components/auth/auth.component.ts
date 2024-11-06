// src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  standalone: true, // Este es esencial para componentes standalone
  imports: [FormsModule, CommonModule], // Asegúrate de que FormsModule esté importado
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';
  username = '';
  isLoginMode = true;
  errorMessage = '';
  successMessage = ''; // Variable para el mensaje de éxito

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = ''; // Reiniciar mensaje al cambiar de modo
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.userService.login(this.email, this.password).subscribe(
        (response) => {
          // Aquí verificamos que la respuesta tenga el token
          if (response && response.token) {
            this.cookieService.set('authToken', response.token);
            this.router.navigate(['/']); // Redirige al home después del login exitoso
            this.errorMessage = ''; // Limpia el mensaje de error
          } else {
            // Si no hay token en la respuesta, muestra un mensaje de error
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        (error) => {
          // Este bloque maneja el error de la petición
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      );
    } else {
      // Lógica de registro
      this.userService
        .createUser(this.username, this.email, this.password)
        .subscribe(
          () => {
            this.successMessage = 'Cuenta creada correctamente';
            this.errorMessage = '';
            this.isLoginMode = true;
          },
          (error) => {
            this.errorMessage = 'Error en el registro';
            this.successMessage = '';
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
