import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  constructor(private auth: AuthService) { }

  private getUsersResponseTable : GetUsersResponse[]

  ngOnInit() {
    this.auth.getAllUsers()
      .subscribe(result => {

        this.getUsersResponseTable = result
        //console.log(this.getUsersResponse)
      })

  }

}

interface GetUsersResponse {
  id: number,
  forename: string,
  surename: string,
  email: string,
  roles: UserRole[]
}

interface UserRole {
  id: number,
  name: string
}
