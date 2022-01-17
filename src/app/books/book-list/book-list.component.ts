import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedBook?: Book;

  constructor(
    public bookService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.getBooks();
    this.booksSub = this.bookService.getBookUpdateListener().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  onEdit(book: Book) {
    this.selectedBook = book;
    this.bookService.getBook(book.id);
    console.log(book.id)
    this.router.navigateByUrl("edit/" + book.id);
  }

  onDelete(bookId: string) {
    this.bookService.deleteBook(bookId);
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }

}
