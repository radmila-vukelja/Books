import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';



@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  enteredTitle = "";
  enteredAuthor = "";
  enteredDescription = "";


  constructor(
    public booksService: BooksService
  ) { }

  ngOnInit(): void {
  }

  onAddBook(form: NgForm) {
    if(form.invalid){
      return
    }
    this.booksService.addBook(form.value.title, form.value.author, form.value.description);
    form.resetForm();
  }

}
