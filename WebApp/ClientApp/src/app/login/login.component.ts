import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  private errorMsg;

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.auth.loginUser(username, password).subscribe(
      result => {
      if (result.password == password && result.username == username) {

        this.auth.setLoginUserStatus(true);

        if (result.username == "admin") {
          this.auth.setLoginAdminStatus(true)
        }

        this.router.navigate(['home'])
      }
    },
      error => window.alert(error)
    )

  }
}
