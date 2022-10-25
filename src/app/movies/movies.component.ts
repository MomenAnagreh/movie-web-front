import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  page: number = 1;
  constructor(public movieService: MoviesService) {
    this.movieService
      .getMovies('populerMovies')
      .subscribe((data) => (this.movieService.mainImg = data[0].image));

    this.movieService.getMovies('trendingMovies').subscribe();

    this.movieService.getMovies('discovrMovies', this.page).subscribe();
  }

  ngOnInit() {}

  onScroll() {
    this.movieService.getMovies('discovrMovies', ++this.page).subscribe();
  }
}
