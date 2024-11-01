import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(private cookieService: CookieService) {
    this.isLoggedIn = this.cookieService.check('authToken'); // Verifica si la cookie existe
  }
}
