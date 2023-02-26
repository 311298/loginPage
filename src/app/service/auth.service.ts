import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/users'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<any>(this.apiUrl)
  }

  getByCode(code: any) {
    return this.httpClient.get<any>(this.apiUrl + '/' + code)
  }

  proceedRegistration(inputData: any) {
    return this.httpClient.post<any>(this.apiUrl, inputData)
  }

  updateUser(inputData: any, code: any) {
    return this.httpClient.put<any>(this.apiUrl + '/' + code, inputData)
  }

  isloggedIn() {
    return sessionStorage.getItem('userName') != null
  }

  getUserRole() {
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole')?.toString() : ''
  }

}
