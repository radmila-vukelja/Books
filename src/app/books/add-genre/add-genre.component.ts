import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  genres: Genre[] = [];
  private genresUpdated = new Subject<Genre[]>();

  constructor(
    private bookService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSaveGenre(form: NgForm) {
    if(form.invalid) {
      alert("Your input is not valid. Please, enter correct information");
      return;
    }

    const genre: Genre = { id: null, name: form.value.name};
    this.bookService.saveGenre(genre).subscribe((data: { message: any }) => {
      console.log(data.message);
      this.genres.push(genre);
      this.genresUpdated.next([...this.genres]);
      this.router.navigateByUrl("");
    }, error => {
      console.log("Adding genre failed" + error)
    });
  }

}
