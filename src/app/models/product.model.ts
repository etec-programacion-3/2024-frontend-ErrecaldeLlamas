export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  size: number;
  color: string;
  description: string;
  stock: number;
  imageUrl: string; // Añade esta línea
  rating?: number; // Opcional
  inventoryStatus?: string; // Propiedad opcional
}
