import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule],
})
export class AppComponent {
  title = 'angular-ecommerce';
  searchQuery: string = ''; // Agrega esta propiedad

  constructor(public userService: UserService, private router: Router) {}

  get isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navega al componente de resultados de búsqueda con el término como parámetro
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery },
      });
    }
  }
}
