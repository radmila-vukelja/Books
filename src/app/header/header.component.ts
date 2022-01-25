import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.getUserRole();
  }

  onLogin() {
    this.router.navigateByUrl("login");
  }

  checkAuth() {
    return this.userService.getAuthStatus();
  }

  onLogout() {
    this.userService.logout();
  }

  goToAddNewBook() {
    this.router.navigateByUrl("/add-new");
  }

  goToAddNewGenre() {
    this.router.navigateByUrl("/new-genre")
  }

  getUserRole() {
    return this.userService.getRole();
  }


}
