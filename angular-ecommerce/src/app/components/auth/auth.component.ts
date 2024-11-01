import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';
  username = '';
  isLoginMode = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.userService.login(this.email, this.password).subscribe(
        (response) => {
          this.cookieService.set('authToken', response.token); // Guarda el token en la cookie
          this.router.navigate(['/home']); // Redirige al home
        },
        (error) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      );
    } else {
      this.userService
        .createUser(this.username, this.email, this.password)
        .subscribe(
          () => this.router.navigate(['/home']),
          (error) => (this.errorMessage = 'Error en el registro')
        );
    }
  }
}
