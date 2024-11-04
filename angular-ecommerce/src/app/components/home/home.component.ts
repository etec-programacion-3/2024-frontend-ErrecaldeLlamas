import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isLoggedIn = false;

  constructor(
    private cookieService: CookieService,
    private productService: ProductService
  ) {
    // Verifica si el usuario está logueado al inicializar el componente
    this.isLoggedIn = this.cookieService.check('authToken');
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
}
