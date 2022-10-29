import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/services/intefaces/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie!: Movie;

  constructor(public router: Router) {
    this.movie = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit(): void {}
}
