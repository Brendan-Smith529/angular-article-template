import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://rsh2vvvpm3.execute-api.us-east-2.amazonaws.com/default/retrieveContent';
  constructor(private http: HttpClient) { }

  getContent() {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
