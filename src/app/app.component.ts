import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserModalComponent } from "./components/user-modal/user-modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    MatDialogModule,
    UserModalComponent,
  ],
})
export class AppComponent implements OnInit {
  title = "angular-ecommerce";
  searchQuery: string = ""; // Query de búsqueda ingresada por el usuario
  isSearchBarVisible: boolean = false; // Estado de visibilidad de la barra de búsqueda
  isLoggedIn: boolean = false; // Estado de inicio de sesión
  isAdmin: boolean = false; // Estado de administrador

  // Iconos de Font Awesome
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateAuthStatus();
    setInterval(() => this.updateAuthStatus(), 1000);
  }

  private updateAuthStatus(): void {
    const authToken = this.cookieService.get("authToken");
    const userRole = this.cookieService.get("userRole");

    const newIsLoggedIn = !!authToken;
    const newIsAdmin = userRole === "admin";

    if (this.isLoggedIn !== newIsLoggedIn || this.isAdmin !== newIsAdmin) {
      this.isLoggedIn = newIsLoggedIn;
      this.isAdmin = newIsAdmin;
      this.cdr.detectChanges();
    }
  }

  toggleSearchBar(): void {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(["/search"], {
        queryParams: { query: this.searchQuery },
      });
    }
  }

  onCartButtonClick(): void {
    if (this.isLoggedIn) {
      this.router.navigate(["/cart"]);
    } else {
      this.router.navigate(["/auth"]);
    }
  }

  openUserModal(): void {
    this.dialog.open(UserModalComponent, {
      disableClose: true, // Evita que se cierre al hacer clic fuera del modal
    });
  }
}
