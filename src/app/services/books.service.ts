import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  getBooks(){
    this.http.get<{message: string, books: Book[]}>("http://localhost:3000/api/books")
    .subscribe((bookInfo) => {
      this.books = bookInfo.books;
      this.booksUpdated.next([...this.books]);
    });
  }

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  addBook(title: string, author: string, description: string) {
    const book: Book = { id: null, title: title, author: author, description: description };
    this.books.push(book);
    this.booksUpdated.next([...this.books]);
  }
}
