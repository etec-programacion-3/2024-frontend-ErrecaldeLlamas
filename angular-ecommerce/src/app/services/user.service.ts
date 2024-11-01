import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // Asegúrate de importar el servicio de cookies
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private loggedInUser: any = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {} // Inyecta el servicio de cookies

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para obtener un usuario por ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Método para crear un nuevo usuario (Registro)
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

  // Método para actualizar un usuario
  updateUser(userId: number, username: string, email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(
      `${this.apiUrl}/${userId}`,
      { username, email },
      { headers }
    );
  }

  // Método para eliminar un usuario
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
          // Almacena el token en una cookie al iniciar sesión
          this.cookieService.set('authToken', response.token); // Cambia esto según tu respuesta
        })
      );
  }
}
