import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '/Users/facundollamas/Desktop/front-end/2024-frontend-ErrecaldeLlamas/angular-ecommerce/src/app/services/user.service'; // Importar el servicio de usuario

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class AuthComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Formulario de Login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Formulario de Sign Up
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = null;
    this.error = null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.message = 'Login successful!';
          this.error = null;
        },
        (error) => {
          this.isLoading = false;
          this.error = 'Login failed. Please check your credentials.';
          this.message = null;
        }
      );
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.userService.createUser(this.signUpForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.message = 'Sign up successful!';
          this.error = null;
        },
        (error) => {
          this.isLoading = false;
          this.error = 'Sign up failed. Please try again.';
          this.message = null;
        }
      );
    }
  }
}
