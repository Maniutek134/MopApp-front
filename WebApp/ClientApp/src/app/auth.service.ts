import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) { }

  private loginResponse: LoginResponse = { id: 0, login: "none", role:"none",isLogged:false } //defaut value of response

  setLoginResponse(loginResponse: LoginResponse) {
    this.loginResponse = loginResponse
  }

  get isLogged() {
    return this.loginResponse.isLogged
  }

  getUserDetails(username, password) {
    return this._http.get<LoginResponse>("http://demo9791456.mockable.io/login/" + username + "/" + password)
      .map(result => result)

  }

 
 


}
interface LoginResponse {
  id: number,
  login: string,
  role:string,
  isLogged: boolean


}
