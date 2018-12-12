import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DevicesDetailsComponent } from './devices-details/devices-details.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthUserGuard } from "./auth.user.guard";
import { AddUserComponent } from './add-user/add-user.component';
import { GetUsersComponent } from './get-users/get-users.component'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DevicesDetailsComponent,
    AdminComponent,
    LoginComponent,
    AddUserComponent,
    GetUsersComponent,
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthUserGuard]
      },
      {
        path: 'devices-details',
        component: DevicesDetailsComponent,
        canActivate: [AuthUserGuard]
      },
      { path: '', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'get-users',
        component: GetUsersComponent,
        canActivate: [AuthUserGuard]
      }
    ])
  ],
  providers: [AuthService, AuthUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
