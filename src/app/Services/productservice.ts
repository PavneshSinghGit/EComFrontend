import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Modal/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7242/api/Product';

  // Angular 20 inject API
  private http = inject(HttpClient);

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
   addProduct(data: any) {
   return this.http.post(this.apiUrl, data);
  }
  updateProduct(product: Product) {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

