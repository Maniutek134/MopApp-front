import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }
  private errorMsg;

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.Auth.loginUser(username, password).subscribe(
      result => {
      if (result.password == password && result.username == username) {

        this.Auth.setLoginUserStatus(true);

        if (result.username == "admin") {
          this.Auth.setLoginAdminStatus(true)
        }

        this.router.navigate(['home'])
      }
      //else {
      //  window.alert("bad credentials");
      //}
    },
      error => window.alert(error)
    )
    //var fx = this.Auth.login;
    //let result = fx.apply(this.Auth, [username,password]);
    
    //console.log(result)
  }
}
