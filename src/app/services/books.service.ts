import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    this.http.get<{message: string, books: any}>("http://localhost:3000/api/books")
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

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  addBook(title: string, author: string, description: string) {
    //id null - ne unosi ga korisnik, mongo ga generise
    const book: Book = { id: null, title: title, author: author, description: description };
    this.http.post<{message: string, bookId: string}>("http://localhost:3000/api/books", book)
    .subscribe((responseData) => {
      //kada se pokupe podaci iz baze, uzima se id (ocekuje se da se dobije u  response-u od backenda) i dodeljuje se property-ju id
      const id = responseData.bookId;
      book.id = id;
      this.books.push(book);
      this.booksUpdated.next([...this.books]);
    });
  }

  deleteBook(bookId: string) {
    this.http.delete("http://localhost:3000/api/books/" + bookId)
    .subscribe(() => {
      const updatedBooks = this.books.filter(book => book.id !== bookId);
      this.books = updatedBooks;
      this.booksUpdated.next([...this.books]);
    })
  }
}
