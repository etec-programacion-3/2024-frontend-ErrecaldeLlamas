import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000/api/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}?q=${encodeURIComponent(query)}`;
    console.log("Sending request to:", searchUrl); // Verificar la URL
    return this.http.get<Product[]>(searchUrl);
  }

  uploadProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>(this.apiUrl, productData, { headers });
  }
}
