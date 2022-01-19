import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if(form.invalid) {
      alert("Entered infromation is not valid.")
      return;
    }
    const user: User = {
      id: null,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password
    }
    this.userService.signUp(user)
    .subscribe((data: { message: any }) => {
      console.log(data.message);
      this.users.push(user);
      this.router.navigateByUrl("/login");
    }, error => {
      console.log("Failed ", error)
    })
  }
  //probaj da dodatno validiras ova polja i ispises poruku korisniku ukoliko nije okej


}
