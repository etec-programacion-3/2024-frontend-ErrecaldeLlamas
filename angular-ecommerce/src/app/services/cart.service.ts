import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/carts';

  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${id}`);
  }

  updateCart(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${id}`, cart);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
