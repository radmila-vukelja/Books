import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormsModule, NgForm, FormControl, FormGroup, Validators } from '@angular/forms';


import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { Genre } from 'src/app/models/genre';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  private bookId!: any;
  private genresUpdated = new Subject<Genre[]>();
  book!: Book;
  form!: FormGroup
  genres: Genre[] = [];
  selectedValue: any;
  

  constructor(
    public route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchBookIdParam();
    this.getAllBooksGenres();
    this.createBookObj();
    this.populateFormWithBookDetails();
  }

  onSaveUpdate(form: NgForm) {
    const book: Book = { id: this.bookId, title: form.value.title, author: form.value.author, description: form.value.description, genre: form.value.genre }
    this.bookService.updateBook(book).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl("");
      }, error => {
        console.log("error: ", error)
      }
    )
  }

  fetchBookIdParam() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = paramMap.get("bookId");
      console.log(this.bookId)
      return this.bookId;
    })
  }

  createBookObj(){
    this.bookService.getBook(this.bookId).subscribe(bookInfo => {
      this.book = {
        id: bookInfo._id,
        title: bookInfo.title,
        author: bookInfo.author,
        description: bookInfo.description,
        genre: bookInfo.genre
      }
    })
  }

  populateFormWithBookDetails() {
    this.form.setValue({
      "title": this.book.title,
      "author": this.book.author,
      "description": this.book.description,
      "genre": this.book.genre
    })
  }

  getAllBooksGenres() {
    this.bookService.getBookGenres().pipe(map(genreInfo => {
      return genreInfo.genres.map((genre: { _id: any, name: any }) => {
        return { id: genre._id, name: genre.name }
      });
    }))
    .subscribe(modGenres => {
      console.log(this.genres)
      this.genres = modGenres;
      this.genresUpdated.next([...this.genres]);
    })
  }

}
