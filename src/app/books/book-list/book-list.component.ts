import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject, Subscription } from 'rxjs';


import { Book } from 'src/app/models/book';
import { Genre } from 'src/app/models/genre';
import { BooksService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  genres: Genre[] = [];
  selectedValue: any;
  selectedBook!: Book;
  filteredBooks: Book[] = [];
  book!: Book
  private booksUpdated = new Subject<Book[]>();
  private genresUpdated = new Subject<Genre[]>();
  private booksSub!: Subscription;

  constructor(
    public bookService: BooksService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.booksSub = this.bookService.getBookUpdateListener().subscribe((books: Book[]) => {
      this.books = books;
    });
    this.getBookGenres();
  }

  onEdit(book: Book) {
    this.selectedBook = book;
    this.bookService.getBook(book.id);
    console.log(book.id)
    this.router.navigateByUrl("edit/" + book.id);
  }

  onDelete(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      const updatedBooks = this.books.filter(book => book.id !== bookId);
      this.books = updatedBooks;
      this.booksUpdated.next([...this.books]);
    })
  }

  getBooks() {
    this.bookService.getBooks().pipe(map((bookInfo) => {
      return bookInfo.books.map((book: { title: any; author: any; description: any; _id: any; genre: Genre }) => {
        return {
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          id: book._id,
        }
         //pipe map shit = transforming data from DB so
        // the id would match _id
      });
    }))
      .subscribe((transformedBooks) => {
        this.books = transformedBooks;
        this.booksUpdated.next([...this.books]);
      });
  }

  getUserRole() {
    return this.userService.getRole();
  }

  checkAuth() {
    return this.userService.getAuthStatus();
  }

  filterBooks(filter: NgModel) {
    if(this.selectedValue === '') {
      this.getBooks();
    }
    this.bookService.getBookByGenre(this.selectedValue).pipe(map(bookInfo => {
      return bookInfo.books.map((book: { title: any; author: any; description: any; id: any; genre: Genre }) => {
        return {
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          id: book.id
        } 
      });
    }))
      .subscribe((transformedBooks) => {
        this.books = transformedBooks;
        this.booksUpdated.next([...this.books]);
      });
  }



  getBookGenres() {
    this.bookService.getBookGenres().pipe(map(genreInfo => {
      return genreInfo.genres.map((genre: { _id: any, name: any }) => {
        return { id: genre._id, name: genre.name }
      });
    }))
      .subscribe(fethcedGenres => {
        this.genres = fethcedGenres;
        this.genresUpdated.next([...this.genres]);
      })
  }

  onClear() {
    this.selectedValue = null;
    this.getBooks();
  }


  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }

}

