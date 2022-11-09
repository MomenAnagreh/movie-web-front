import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies-service/movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  size: number = 0;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  search(name: string) {
    if (name.length > 0) {
      this.movieService.searchMovie(name);
    }
  }
}
