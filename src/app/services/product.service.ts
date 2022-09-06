import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/products.model';
import { Observable, throwError, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: ProductModel = {
    id: '',
    name: '',
    description: '',
    price: 0,
    units: 0,
    image: ''
  };


  constructor(private http: HttpClient) {    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(environment.PRODUCT_SERVICE + 'products')
    .pipe(
      catchError(this.handleError<ProductModel[]>('getProducts', []))
    );;
  }

  getProduct(id: string): Observable<ProductModel>{    
    return this.http.get<ProductModel>(environment.PRODUCT_SERVICE + 'products/'+id)
    .pipe(
      catchError(this.handleError<ProductModel>('getProductById', this.product))
    );
  } 
}
