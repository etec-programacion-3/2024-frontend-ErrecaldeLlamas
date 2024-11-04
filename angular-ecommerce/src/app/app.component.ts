// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  title = 'angular-ecommerce';
  constructor(public userService: UserService) {}

  get isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
