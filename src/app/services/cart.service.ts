import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/carts';
  private cartItemsUrl = 'http://localhost:3000/api/cart-items';
  private userService!: UserService;

  constructor(private http: HttpClient, private injector: Injector) {}

  private getUserService(): UserService {
    if (!this.userService) {
      this.userService = this.injector.get(UserService);
    }
    return this.userService;
  }

  // Crear un carrito para un usuario específico
  createCart(userId: number): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}`, { userId }).pipe(
      catchError((error) => {
        console.error('Error creando carrito:', error);
        return throwError(() => new Error('Error al crear el carrito.'));
      })
    );
  }

  // Obtener el carrito del usuario actual
  getCart(): Observable<any> {
    const cartId = Number(this.getUserService().getUserCartId());
    if (!cartId) {
      return throwError(() => new Error('Cart ID is undefined or invalid.'));
    }
    return this.http.get(`${this.apiUrl}/${cartId}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el carrito:', error);
        return throwError(() => new Error('Error al obtener el carrito.'));
      })
    );
  }

  // Agregar producto al carrito
  addToCart(productId: number, quantity: number): Observable<any> {
    const cartId = Number(this.getUserService().getUserCartId());
    if (!cartId) {
      return throwError(
        () => new Error('No se encontró un cartId válido para el usuario.')
      );
    }
    return this.http
      .post(this.cartItemsUrl, { cartId, productId, quantity })
      .pipe(
        catchError((error) => {
          console.error('Error agregando al carrito:', error);
          return throwError(() => new Error('Error al agregar al carrito.'));
        })
      );
  }

  // Actualizar cantidad de producto en el carrito
  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http
      .put(`${this.cartItemsUrl}/${cartItemId}`, { quantity })
      .pipe(
        catchError((error) => {
          console.error('Error actualizando item del carrito:', error);
          return throwError(() => new Error('Error al actualizar el item.'));
        })
      );
  }

  // Eliminar producto del carrito
  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.cartItemsUrl}/${cartItemId}`).pipe(
      catchError((error) => {
        console.error('Error eliminando item del carrito:', error);
        return throwError(() => new Error('Error al eliminar el item.'));
      })
    );
  }
}
