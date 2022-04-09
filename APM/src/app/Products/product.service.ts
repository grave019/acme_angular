import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
        );
    }


private handleError(err: HttpErrorResponse) {
  // in a real world applicationCache, we may send the server to some remote logging infrastructure
  // instead of just loggin it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A Client-side or network error occured. Handle it accordingly.
    errorMessage = `An error occured: ${err.error.message}`;
  } else {
    // the backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  } 
 console.error(errorMessage);
 return throwError(errorMessage); 
}

//function handleError(err: any, HttpErrorResponse: typeof HttpErrorResponse) {
 // throw new Error("Function not implemented.");
}
