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
    autoplay: 1,
  };

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getMovies('populerMovies').subscribe((data) => {
      this.movieService.mainImg = data[0];
      this.movieService
        .getProviders(String(data[0].id))
        .subscribe((providers: any) => {
          if (providers.results.US) {
            this.movieService.providerLink = providers.results.US.link;
          } else {
            Object.values(providers.results).forEach((elem: any, i: number) => {
              if (i === 0) this.movieService.providerLink = elem.link;
            });
          }
        });
      this.movieService
        .getTrailer(String(data[0].id))
        .subscribe((data: any) => {
          if (data) {
            data.results.forEach((trail: any) => {
              if (trail.name === 'Official Trailer') {
                this.movieService.trailerKey = trail.key;
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
    if (this.movieService.trailerKey) {
      document.body.style.overflow = 'hidden';
    }
  }

  goBack() {
    this.movieService.trailerClicked = false;
    document.body.style.overflow = 'auto';
  }
}
