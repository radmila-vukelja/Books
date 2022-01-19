import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { 
  }

  signUp(user: User) {
    return this.http.post<{message: string}>("http://localhost:3000/api/users", user);
  }

  login(loginInfo: {username: string, password: string}) {
    return this.http.post<{userId: string, message: any}>("http://localhost:3000/api/users/login", loginInfo);
  }

}
