import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, UserProfileComponent],
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  searchQuery: string = '';
  isAccountPanelOpen: boolean = false;
  isLoggedIn: boolean = false; // Inicializar isLoggedIn en false

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el estado de inicio de sesión
    this.userService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn; // Actualiza el estado
      },
      (error) => {
        console.error('Error en la suscripción de isLoggedIn:', error);
      }
    );
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery },
      });
    }
  }

  toggleAccountPanel(): void {
    this.isAccountPanelOpen = !this.isAccountPanelOpen;
  }

  closeAccountPanel(): void {
    this.isAccountPanelOpen = false;
  }

  logout(): void {
    this.userService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
