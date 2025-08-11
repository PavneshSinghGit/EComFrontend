import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../Modal/product';
import { ProductService } from '../../Services/productservice';

@Component({
  selector: 'app-item-master',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-master.html',
  styleUrls: ['./item-master.css']
})
export class ItemMaster implements OnInit {

  @ViewChild('myModal') modal!: ElementRef; // Modal reference

  productForm!: FormGroup;
  productList: Product[] = [];
  formValueProduct: any;
  // Inject service
  prodService = inject(ProductService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setProductFormState();
    this.getProduct();
  }

  /** Show modal */
  openModal() {
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  /** Hide modal */
  closeModal() {
    this.setProductFormState();
    if (this.modal!=null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  /** Initialize product form */
  setProductFormState() {
    this.productForm = this.fb.group({
      id: [0],
      ProductName: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Rating: ['', [Validators.required]],
      Status: [false, [Validators.required]]
    });
  }

  /** Form submit handler */
  OnSubmit() {
    if (this.productForm.invalid) {
      alert('Please fill all required fields');
      return;
    } else {
      this.formValueProduct = this.productForm.value;
      this.prodService.addProduct(this.formValueProduct).subscribe((res) => {
        alert('Product added successfully');
        this.productForm.reset();
        this.getProduct();
        this.closeModal();
      });
    }
  }

  /** Get products from API */
  getProduct() {
    this.prodService.getAllProduct().subscribe((res) => {
      this.productList = res;
    });
  }
  /** Update product */
 onEdit(product:Product)
  {
      this.openModal();
      this.productForm.patchValue({
        id: product.id,
        ProductName: product.productName,
        Price: product.price,
        Description: product.description,
        Rating: product.rating,
        Status: product.status
      });
    }
  /** Delete product */
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.prodService.deleteProduct(id).subscribe((res) => {
        alert('Product deleted successfully');
        this.getProduct();
      });
    }
  }

}
