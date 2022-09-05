import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/products.model';
import {ProductService } from '../services/product.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];
  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: ProductModel[])=>{      
      console.log(data);      
    });
  }

  

}
