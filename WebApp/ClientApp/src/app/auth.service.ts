import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) { }

  private loginUserResponse: LoginUserResponse = { id: 0, forename: "none", surename: "none", username: "none", email: "none", password: "none", userRoles:"none" } //defaut value of response

  private loginUserStatus: boolean = false;
  private loginAdminStatus: boolean = false;

  setLoginUserStatus(loginStatus) {
    this.loginUserStatus = loginStatus;
  }

  setLoginAdminStatus(loginStatus) {
    this.loginAdminStatus = loginStatus;
  }

  get isUserLogged() {
    return this.loginUserStatus
  }

  get isAdminLogged() {
    return this.loginAdminStatus
  }
  //setLoginResponse(loginResponse: LoginResponse) {
  //  this.loginResponse = loginResponse
  //}

  //get isLogged() {
  //  return this.loginResponse.isLogged
  //}

  loginUser(username, password) {
    let body = new HttpParams()
      .set('username', username)
      .set('password', password);
    //let body = { username:'admin', password:'dupa8' };
    let headers = new Headers({ 'Content-Type': 'application/json'});

    headers.append('Authorization', "No Auth");
    //let options = new RequestOptions({ headers: headers });

    return this._http.post<LoginUserResponse>("http://ec2-18-195-99-124.eu-central-1.compute.amazonaws.com/api/user/authenticate", body)
      .map(result => result)
      .catch(this.errorHandler)

  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message)
  }
 


}
interface LoginUserResponse {
  id: number,
  forename: string,
  surename: string,
  username: string,
  email: string,
  password: string,
  userRoles:string

}

interface LoginUser {
  username: string,
  password: string
}
