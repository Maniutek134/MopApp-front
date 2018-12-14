import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DevicesDetailsComponent } from './devices-details/devices-details.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { LogoutComponent } from './logout/logout.component'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DevicesDetailsComponent,
    LoginComponent,
    AddUserComponent,
    GetUsersComponent,
    LogoutComponent
  
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
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'user'
        } 
      },
      {
        path: 'devices-details',
        component: DevicesDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'user'
        } 
      },
      { path: '', component: LoginComponent },
      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'admin'
        } 
      },
      {
        path: 'get-users',
        component: GetUsersComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'admin'
        } 
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'user'
        }
      }
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
