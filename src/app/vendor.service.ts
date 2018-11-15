import { Injectable } from '@angular/core';
import { Vendor } from './vendor';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private vendorsUrl = 'api/vendors'; 

  constructor(private http: HttpClient) { }

  getVendors (): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorsUrl)
      .pipe(
        catchError(this.handleError('getVendors', []))
      );
  }

  /* GET vendors whose name contains search term */
  searchVendors(term: string): Observable<Vendor[]> {
    if (!term.trim()) {
      // if not search term, return empty vendor array.
      return of([]);
    }
    return this.http.get<Vendor[]>(`${this.vendorsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Vendor[]>('searchVendors', []))
    );
  }

  updateVendor(vendor: Vendor): any {
    return this.http.put(this.vendorsUrl, vendor, httpOptions).pipe(
      catchError(this.handleError<any>('updateVendor'))
    );
  }
  getVendor(id: number): Observable<Vendor> {
    const url = `${this.vendorsUrl}/${id}`;
    return this.http.get<Vendor>(url).pipe(
      catchError(this.handleError<Vendor>(`getVendor id=${id}`))
    );
  }

  addVendor (vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.vendorsUrl, vendor, httpOptions).pipe(
      catchError(this.handleError<Vendor>('addVendor'))
    );
  }

  deleteVendor (vendor: Vendor | number): Observable<Vendor> {
    const id = typeof vendor === 'number' ? vendor : vendor.id;
    const url = `${this.vendorsUrl}/${id}`;

    return this.http.delete<Vendor>(url, httpOptions).pipe(
      catchError(this.handleError<Vendor>('deleteVendor'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
