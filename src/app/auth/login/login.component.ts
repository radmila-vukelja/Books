import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isAuthenticated = false;
  token!: string | null;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer!: any;
  private userId!: string | null;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if(form.invalid){
      alert("Entered infromation is not valid.")
      return;
    }

    const loginInfo = { username: form.value.username, password: form.value.password};
    this.userService.login(loginInfo).subscribe(data => {
        this.isAuthenticated = true;
        this.userId = data.userId;
        this.authStatusListener.next(true);
        this.router.navigateByUrl("");
    })
  }

  signupRedirect() {
    this.router.navigateByUrl("/signup")
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer:" + duration);
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.router.navigate(['/']);
}

private saveAuthData(token: string, expiration: Date, userId: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('userId', userId);
}

private getAuthData() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiration");
  const userId = localStorage.getItem("userId");
  if(!token || !expiration) {
      return false;
  }
  return {
      token: token,
      expiration: new Date(expiration),
      userId: userId
  }
}


}


      //const token = data.token;
      //this.token = token;
      //if(token) {
        //const expires = data.expiresIn;
       // this.setAuthTimer(expires);
       //this.isAuthenticated = true;
       //this.userId = data.userId;
       //this.authStatusListener.next(true);
       //const now = new Date();
       //const expiration = new Date(now.getTime() + expires * 1000);
      // this.saveAuthData(token, expiration, this.userId);
      //this.router.navigateByUrl("");
    // }