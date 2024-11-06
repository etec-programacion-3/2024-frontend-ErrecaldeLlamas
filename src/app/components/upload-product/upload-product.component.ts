import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common"; // Importa CommonModule
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-upload-product",
  templateUrl: "./upload-product.component.html",
  styleUrls: ["./upload-product.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de importar ambos módulos aquí
})
export class UploadProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      size: ["", Validators.required],
      color: ["", Validators.required],
      description: ["", Validators.required],
      stock: ["", [Validators.required, Validators.min(0)]],
      imageUrl: ["", Validators.required], // Asegúrate de que la URL de la imagen también sea requerida
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.uploadProduct(this.productForm.value).subscribe(
        (response) => {
          console.log("Producto subido con éxito:", response);
          // Puedes agregar lógica aquí para redirigir al usuario o mostrar un mensaje
        },
        (error) => {
          console.error("Error al subir el producto:", error);
        }
      );
    } else {
      console.log("Formulario no válido");
    }
  }
}
