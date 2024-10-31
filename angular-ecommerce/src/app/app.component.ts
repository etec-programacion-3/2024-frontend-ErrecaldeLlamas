import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule], // Asegúrate de importar RouterModule aquí
})
export class AppComponent {
  title = 'angular-ecommerce';
}
