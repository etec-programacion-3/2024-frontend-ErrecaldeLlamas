import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cartService: CartService,
    private router: Router
  ) {}

  // Obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Crear un nuevo usuario
  createUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      this.apiUrl,
      { username, email, password },
      { headers }
    );
  }

  // Actualizar un usuario
  updateUser(userId: number, username: string, email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(
      `${this.apiUrl}/${userId}`,
      { username, email },
      { headers }
    );
  }

  // Eliminar un usuario
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  // Método de inicio de sesión
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password }, { headers })
      .pipe(
        tap((response) => {
          this.cookieService.set('authToken', response.token);
          this.cookieService.set('userRole', response.role);
          this.cookieService.set('userId', response.user.id.toString());
          if (response.cartId) {
            this.cookieService.set('cartId', response.cartId.toString());
          }
        }),
        switchMap((response) => {
          if (!response.cartId) {
            return this.cartService.createCart(response.user.id).pipe(
              tap((cart) => {
                this.cookieService.set('cartId', cart.id.toString());
              }),
              switchMap(
                () => new Observable((observer) => observer.next(response))
              )
            );
          }
          return new Observable((observer) => observer.next(response));
        }),
        tap(() => {
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.error('Error en el inicio de sesión:', error);
          return throwError(() => new Error('Error en el inicio de sesión.'));
        })
      );
  }

  // Obtener rol del usuario actual
  getUserRole(): string {
    return this.cookieService.get('userRole');
  }

  // Verificar si el usuario es administrador
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  // Obtener el cartId del usuario actual
  getUserCartId(): string | null {
    return this.cookieService.get('cartId');
  }

  // Obtener el userId del usuario actual
  getUserId(): string | null {
    return this.cookieService.get('userId');
  }

  // Método de cierre de sesión
  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('userRole');
    this.cookieService.delete('userId');
    this.cookieService.delete('cartId');
    this.router.navigate(['/auth']);
  }
}
