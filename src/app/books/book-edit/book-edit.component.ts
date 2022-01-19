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
    this.fetchIdParam();
    this.createBookObj();
    this.populateFormWithBookDetails();
  }

  onSaveUpdate(form: NgForm) {
    const book: Book = { id: this.bookId, title: form.value.title, author: form.value.author, description: form.value.description }
    this.bookService.updateBook(book).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl("");
      }, error => {
        console.log("error: ", error)
        alert(error)
      }
    )
  }

  fetchIdParam() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = paramMap.get("bookId");
      return this.bookId;
    })
  }

  createBookObj(){
    this.bookService.getBook(this.bookId).subscribe(bookInfo => {
      this.book = {
        id: bookInfo._id,
        title: bookInfo.title,
        author: bookInfo.author,
        description: bookInfo.description
      }
    })
  }

  populateFormWithBookDetails() {
    this.form.setValue({
      "title": this.book.title,
      "author": this.book.author,
      "description": this.book.description
    })
  }

}

    //hvatanje ovog parametra iz url-a treba da se izdvoji u drugu f-ju koja ce se pozvati na ngOnInit
    //this.route.paramMap.subscribe((paramMap: ParamMap) => {
     // this.bookId = paramMap.get("bookId");
     // console.log(this.bookId)

      //this.bookService.getBook(this.bookId).subscribe(bookInfo => {

        //kreiranje objekta takodje treba da se izmesti u drugu f-ju
        //this.book = {
        //  id: bookInfo._id,
        //  title: bookInfo.title,
        //  author: bookInfo.author,
        //  description: bookInfo.description
       // };


        //postavljanje vrednosti na formu takodje treba da se izmesti u drugu f-ju
        //tako ces moci tu f-ju da pozivas vise puta ukoliko to bude bilo potrebno
        //skoro uvek treba da pravis stvari sa namerom da to moze da se koristi vise puta 
        //jer ce najverovatnije to biti tako
        //this.form.setValue({
        //  "title": this.book.title,
         // "author": this.book.author,
         // "description": this.book.description
      //  })
      //})
   // })
