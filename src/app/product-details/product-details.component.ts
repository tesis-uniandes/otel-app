import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/products.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: string = '';
  product: ProductModel = {
    id: '',
    name: '',
    description: '',
    price: 0,
    units: 0,
    image: ''
  };

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.productId = params['id'];
    })
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct(this.productId).subscribe((data: ProductModel)=>{      
      console.log(data);  
      this.product = data;    
    });
  }

}
