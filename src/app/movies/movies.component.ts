import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  page: number = 1;

  playerConfig = {
    controls: 0,
    mute: 1,
    autoplay: 1,
  };

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getMovies('populerMovies').subscribe((data) => {
      this.movieService.mainImg = data[0];
      this.movieService
        .getTrailer(String(data[0].id))
        .subscribe((data: any) => {
          if (data) {
            console.log(data);
            data.results.forEach((trail: any) => {
              if (trail.name === 'Official Trailer') {
                this.movieService.trailerKey = trail.key;
                console.log(this.movieService.trailerKey);
              }
            });
          }
        });
    });

    this.movieService.getMovies('trendingMovies').subscribe();

    this.movieService.getMovies('discovrMovies', this.page).subscribe();
  }

  onScroll() {
    this.movieService.getMovies('discovrMovies', ++this.page).subscribe();
  }

  showVideo() {
    this.movieService.trailerClicked = true;
  }
}
