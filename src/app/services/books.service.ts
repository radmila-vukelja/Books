import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Book } from '../models/book';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    window.close();
   }

  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  getBooks() {
    this.http.get<{ message: string, books: any }>("http://localhost:3000/api/books")
      .pipe(map((bookInfo) => {
        return bookInfo.books.map((book: { title: any; author: any; description: any; _id: any; }) => {
          return {
            title: book.title,
            author: book.author,
            description: book.description,
            id: book._id
          } //pipe map shit = transforming data from DB so
          // the id would match _id
        });
      }))
      .subscribe((transformedBooks) => {
        this.books = transformedBooks;
        this.booksUpdated.next([...this.books]);
      });
  }

  getBook(id: string) {
    return this.http.get<{ _id: string, title: string, author: string, description: string }>("http://localhost:3000/api/books/" + id);
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

}

/*
    let bookInfo: Book | FormData;

    bookInfo = new FormData();
    bookInfo.append("id", id);
    bookInfo.append("title", title);
    bookInfo.append("author", author);
    bookInfo.append("description", description);
    */