import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  debounce,
  Observable,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { Patient } from '../shared/utils/Patient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:9000/patient';
  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getPatient(patientID: string): Observable<Patient> {
    const url = `${this.apiUrl}/${patientID}`;
    return this.http.get<Patient>(url).pipe(
      // retry(3), // retry a failed request up to 3 times

      catchError(this.handleError)
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http
      .post<Patient>(this.apiUrl, patient, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePatient(patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/${patient.id}`;
    return this.http.delete<Patient>(url).pipe(catchError(this.handleError));
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
