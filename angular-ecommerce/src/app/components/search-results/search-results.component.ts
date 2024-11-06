import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agrega RouterModule aquí
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  products: Product[] = [];
  private queryParamSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Escucha los cambios en los parámetros de búsqueda de la URL
    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
      this.performSearch(); // Ejecuta la búsqueda cada vez que cambie el término
    });
  }

  performSearch(): void {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error en la búsqueda de productos:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles fugas de memoria
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }
}
