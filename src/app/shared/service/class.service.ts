import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiUrls } from '../uris/ApiUrls';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = ApiUrls.CLASSES_URL;

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }
  createClass(vehicleId : number,date: string, timeStart: string, timeEnd: string, userId: number, active : number): Observable<any> {
    const classData = {
      vehicleId,
      date,
      timeStart,
      timeEnd,
      active
    };
    return this.http.post<any>(`${this.apiUrl}/${userId}`, classData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Creation failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while creating. Please try again later.');
        }
      })
    );
  }

  updateClass(updatedData: any, classId : number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${classId}`, updatedData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Update failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while updating. Please try again later.');
        }
      })
    );
  }

  deleteClass(classId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${classId}`).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError('Deletion failed. Please check your details and try again.');
        } else {
          return throwError('An error occurred while deleting. Please try again later.');
        }
      })
    );
  }
}
