import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) { }

  public loginResponse;

  getUserDetails(username, password) {
    return this._http.get<loginResponse>("http://demo9791456.mockable.io/login/" + username + "/" + password)
      .map(result => result)

  }

 


}
interface loginResponse {
  id: number,
  login: string,
  isLogged: boolean
}
