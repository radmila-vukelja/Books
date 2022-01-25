import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Book } from '../models/book';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
   }

  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();
  private genres: Genre[] = [];
  

  getBooks() {
    return this.http.get<{ message: string, books: any }>("http://localhost:3000/api/books");
  }

  getBookGenres() {
    return this.http.get<{message: any, genres: any }>("http://localhost:3000/api/genres");
  }

  getGenre(id: string) {
    return this.http.get<{ _id: string, name: string }>("http://localhost:3000/api/genres/" + id);
  }

  getBook(id: string) {
    return this.http.get<{ _id: string, title: string, author: string, description: string, genre: Genre }>("http://localhost:3000/api/books/" + id);
  }

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  addBook(book: Book) {
    return this.http.post<{ message: string }>("http://localhost:3000/api/books", book);
  }

  deleteBook(bookId: string) {
    return this.http.delete("http://localhost:3000/api/books/" + bookId)
  }

  updateBook(book: Book) {
    return this.http.put<Book>("http://localhost:3000/api/books/" + book.id, book);
  }

  saveGenre(genre: Genre) {
    return this.http.post<{ message: string }>("http://localhost:3000/api/genres", genre.name);
  }

  getBookByGenre(genre: string) {
    return this.http.get<{ message: string, books: any }>("http://localhost:3000/api/books/filtered/" + genre);
  }

}
