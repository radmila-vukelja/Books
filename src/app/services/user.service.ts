import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Subject } from 'rxjs/internal/Subject';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated = false;
  userId!: string | null;
  token!: string | null;
  role!: string | null;
  tokenTimer!: any;
  authStatusListener = new Subject<boolean>();
  isAdmin = false;


  constructor(
    public http: HttpClient,
    private router: Router
  ) { 
  }

  signUp(user: User) {
    return this.http.post<{message: string}>("http://localhost:3000/api/users", user);
  }

  login(loginInfo: {username: string, password: string}) {
    return this.http.post<{userId: string, token: string, expiresIn: number, role: string}>("http://localhost:3000/api/users/login", loginInfo);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  saveAuthData(token: string, expiration: Date, userId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role)
    }
  
  getAuthData() {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if(!token || !expiration) {
        return false;
    }
    return {
        token: token,
        expiration: new Date(expiration),
        userId: userId,
        role: role
    }
  }

  getRole() {
    const role = localStorage.getItem("role");
    if(role === "admin") {
      return this.isAdmin = true;
    }
    return this.isAdmin = false;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.role = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  setAuthTimer(duration: number) {
    console.log("Setting timer:" + duration);
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
        return;
    }
    const now = new Date();
    if(authInformation) {
       const expiresIn = authInformation.expiration.getTime() - now.getTime();
       if(expiresIn > 0) {
        this.token = authInformation?.token;
        this.isAuthenticated = true;
        this.userId = authInformation.userId;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
        }
    }
}

}
