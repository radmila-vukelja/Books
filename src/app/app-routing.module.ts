import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { LoginComponent } from './auth/login/login.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddGenreComponent } from './books/add-genre/add-genre.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: BookListComponent },
  { path: "add-new", component: BookAddComponent, canActivate:[AuthGuard]},
  { path: "edit/:bookId", component: BookEditComponent, canActivate:[AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "new-genre", component: AddGenreComponent, canActivate:[AuthGuard] },
  { path:"**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }