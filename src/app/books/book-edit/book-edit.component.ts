import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormsModule, NgForm, FormControl, FormGroup, Validators } from '@angular/forms';


import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  private bookId!: any;
  book!: Book;
  form!: FormGroup

  constructor(
    public route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = paramMap.get("bookId");
      console.log(this.bookId)
      this.bookService.getBook(this.bookId).subscribe(bookInfo => {
        this.book = {
          id: bookInfo._id,
          title: bookInfo.title,
          author: bookInfo.author,
          description: bookInfo.description
        };
        this.form.setValue({
          "title": this.book.title,
          "author": this.book.author,
          "description": this.book.description
        })
      })
    })
  }

  onSaveUpdate(form: NgForm) {
    this.bookService.updateBook(this.bookId, form.value.title, form.value.author, form.value.description);
    this.router.navigateByUrl("");
  }

}
