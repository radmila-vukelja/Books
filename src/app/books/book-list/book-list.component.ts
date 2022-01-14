import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  private booksSub!: Subscription;

  constructor(
    public bookService: BooksService
  ) { }

  ngOnInit(): void {
    this.bookService.getBooks();
    this.booksSub = this.bookService.getBookUpdateListener().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  onDelete(bookId: string) {
    this.bookService.deleteBook(bookId);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }

}
