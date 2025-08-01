import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = environment.apiUrl + '/api/data';

  constructor(private http: HttpClient) {}

  getAdminData(): Observable<string> {
    return this.http.get(this.apiUrl + '/admin', { responseType: 'text' });
  }

  getPost1Data(): Observable<string> {
    return this.http.get(this.apiUrl + '/post1', { responseType: 'text' });
  }

  getPost2Data(): Observable<string> {
    return this.http.get(this.apiUrl + '/post2', { responseType: 'text' });
  }

  getPost3Data(): Observable<string> {
    return this.http.get(this.apiUrl + '/post3', { responseType: 'text' });
  }

  getPost4Data(): Observable<string> {
    return this.http.get(this.apiUrl + '/post4', { responseType: 'text' });
  }

  getPost5Data(): Observable<string> {
    return this.http.get(this.apiUrl + '/post5', { responseType: 'text' });
  }
}
