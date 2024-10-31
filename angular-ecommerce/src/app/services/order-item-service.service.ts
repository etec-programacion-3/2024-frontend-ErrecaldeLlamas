import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private apiUrl = 'http://localhost:3000/api/cart-items';

  constructor(private http: HttpClient) {}

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, cartItem);
  }

  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/${id}`);
  }

  updateCartItem(id: number, cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${id}`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
