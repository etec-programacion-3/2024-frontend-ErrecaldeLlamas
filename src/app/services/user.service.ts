import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { CartService } from "./cart.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:3000/api/users";
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para el estado de autenticación

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cartService: CartService,
    private router: Router
  ) {}

  // Obtener un usuario por su ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener usuario con ID ${userId}:`, error);
        return throwError(() => new Error("Error al obtener el usuario."));
      })
    );
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    try {
      return !!this.cookieService.get("authToken");
    } catch (error) {
      console.error("Error al verificar si el usuario está logueado:", error);
      return false;
    }
  }

  // Obtener el token de autenticación
  getAuthToken(): string | null {
    return this.cookieService.get("authToken");
  }

  // Obtener el rol del usuario
  getUserRole(): string {
    return this.cookieService.get("userRole");
  }

  // Obtener el userId del usuario actual
  getUserId(): string | null {
    return this.cookieService.get("userId");
  }

  // Obtener el cartId del usuario actual
  getUserCartId(): string | null {
    return this.cookieService.get("cartId");
  }

  // Obtener datos del usuario autenticado
  getUserData(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  // Crear un nuevo usuario
  createUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(this.apiUrl, { username, email, password }, { headers })
      .pipe(
        switchMap((user) => {
          return this.cartService.createCart(user.id).pipe(
            tap((cart) => {
              this.cookieService.set("cartId", cart.id.toString());
            }),
            switchMap(() => new Observable((observer) => observer.next(user)))
          );
        })
      );
  }

  // Método de inicio de sesión
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password }, { headers })
      .pipe(
        switchMap((response) => {
          if (!response || !response.token) {
            throw new Error("No se recibió un token en la respuesta.");
          }

          // Guardar datos en cookies
          this.cookieService.set("authToken", response.token);
          this.cookieService.set("userId", response.user.id.toString());
          this.cookieService.set("userRole", response.user.role || "user");
          this.isLoggedInSubject.next(true); // Actualizar el estado de autenticación

          const userId = response.user.id;

          // Intentar obtener el carrito del usuario
          return this.cartService.getCartByUserId(userId).pipe(
            tap((cart) => {
              if (cart && cart.id) {
                this.cookieService.set("cartId", cart.id.toString());
              }
            }),
            catchError((error) => {
              // Si no se encuentra un carrito, crear uno nuevo
              if (error.status === 404) {
                return this.cartService.createCart(userId).pipe(
                  tap((newCart) => {
                    this.cookieService.set("cartId", newCart.id.toString());
                  })
                );
              }
              return throwError(() => error);
            }),
            switchMap(() => {
              // Propagar la respuesta final después de carrito
              return new Observable((observer) => observer.next(response));
            })
          );
        }),
        catchError((error) => {
          console.error("Error en el inicio de sesión:", error);
          return throwError(
            () => new Error("Usuario o contraseña incorrectos.")
          );
        })
      );
  }

  // Método de cierre de sesión
  logout(): void {
    this.cookieService.deleteAll();
    this.isLoggedInSubject.next(false); // Actualizar el estado de autenticación
    this.router.navigate(["/auth"]);
  }

  // Crear encabezados de autenticación
  private createAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get("authToken");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
}
