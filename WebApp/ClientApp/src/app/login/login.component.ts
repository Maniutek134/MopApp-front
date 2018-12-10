import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.Auth.getUserDetails(username, password).subscribe(result => {
      if (result.isLogged === true && result.login == username) {
        window.location.href = '/'
      }
      else {
        window.alert("invalid credentials");
      }
      //console.log(result)
    })
    //var fx = this.Auth.login;
    //let result = fx.apply(this.Auth, [username,password]);
    
    //console.log(result)
  }
}
