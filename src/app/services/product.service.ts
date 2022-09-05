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
  private httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
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

  getProduct(id: string){
    return this.http.get(environment.PRODUCT_SERVICE + 'products/'+id, this.httpOptions);
  }

 
}
