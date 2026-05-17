import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../Interfaces/IRegister';
import { API_ENDPOINTS } from '../api/baseUrl';
import { ILogin, ILoginResponse } from '../Interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private _httpClient: HttpClient) {}

  isLoggedIn = false;

  register(registerData: IRegister): Observable<IRegister> {
    return this._httpClient.post<IRegister>(`${API_ENDPOINTS.Register}`, registerData);
  }

  login(loginData: ILogin): Observable<ILoginResponse> {
    return this._httpClient.post<ILoginResponse>(`${API_ENDPOINTS.Login}`, loginData);
  }
}
