import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Doctor } from '../shared/utils/Doctor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:9000/doctor';
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getDoctorByID(doctorID: string): Observable<Doctor> {
    const url = `${this.apiUrl}/${doctorID}`;
    return this.http.get<Doctor>(url).pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http
      .post<Doctor>(this.apiUrl, doctor, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteDoctor(doctor: Doctor): Observable<Doctor> {
    const url = `${this.apiUrl}/${doctor.id}`;
    return this.http.delete<Doctor>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );

      errorMessage = error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
