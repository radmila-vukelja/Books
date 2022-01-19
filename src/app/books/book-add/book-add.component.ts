import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  constructor(
    public booksService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onAddBook(form: NgForm) {
    if(form.invalid){
      return
    }
    const book: Book = { id: null, title: form.value.title, author: form.value.author, description: form.value.description };
    this.booksService.addBook(book).subscribe((data: { message: any; }) => {
      console.log(data.message);
      this.books.push(book);
      this.booksUpdated.next([...this.books]);
      this.router.navigateByUrl("");
    }, error => {
      console.log("Failed ", error)
    })
  }

}

