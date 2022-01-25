import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

import { Genre } from 'src/app/models/genre';


@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();
  genres: Genre[] = [];
  selectedValue: any;
  private genresUpdated = new Subject<Genre[]>();

  constructor(
    public booksService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBooksGenres();
  }



  onAddBook(form: NgForm) {

    const book: Book = { id: null, title: form.value.title, author: form.value.author, description: form.value.description, genre: form.value.genre };
    this.booksService.addBook(book).subscribe((data: { message: any; }) => {
      console.log(data.message);
      this.books.push(book);
      this.booksUpdated.next([...this.books]);
      this.router.navigateByUrl("");
    }, error => {
      console.log("Failed ", error)
    })
  }

  getAllBooksGenres() {
    this.booksService.getBookGenres().pipe(map(genreInfo => {
      return genreInfo.genres.map((genre: { _id: any, name: any }) => {
        return { id: genre._id, name: genre.name }
      });
    }))
      .subscribe(modGenres => {
        this.genres = modGenres;
        this.genresUpdated.next([...this.genres]);
      })
  }




}

