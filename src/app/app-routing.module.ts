import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { LoginComponent } from './auth/login/login.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: "", component: BookListComponent },
  { path: "add-new", component: BookAddComponent},
  { path: "edit/:bookId", component: BookEditComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
