// app.component.ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, UserProfileComponent],
})
export class AppComponent implements OnInit {
  title = "angular-ecommerce";
  searchQuery: string = "";
  isAccountPanelOpen: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al estado de inicio de sesión
    this.userService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      // Si el usuario está autenticado, obtenemos el ID del usuario y luego sus datos
      if (this.isLoggedIn) {
        const userId = this.userService.getUserId(); // Obtener el ID del usuario desde la cookie
        if (userId) {
          this.userService.getUserById(+userId).subscribe(
            (userData) => {
              // Extraer el rol y verificar si es "admin"
              this.isAdmin = userData.role === "admin";
              console.log("User role:", userData.role); // Verificar el rol en la consola
            },
            (error) => {
              console.error("Error al obtener los datos del usuario:", error);
            }
          );
        }
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(["/search"], {
        queryParams: { query: this.searchQuery },
      });
    }
  }

  toggleAccountPanel(): void {
    this.isAccountPanelOpen = !this.isAccountPanelOpen;
  }

  closeAccountPanel(): void {
    this.isAccountPanelOpen = false;
  }

  logout(): void {
    this.userService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false; // Restablecer isAdmin al cerrar sesión
    this.router.navigate(["/auth"]);
  }
}
