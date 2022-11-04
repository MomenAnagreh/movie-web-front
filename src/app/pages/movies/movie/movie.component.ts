import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies-service/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie'];
    this.movieService.spinner = false;
  }

  showVideo(key: string) {
    this.movieService.trailerKey = key;
    setTimeout(() => {
      this.movieService.trailerClicked = true;
      if (this.movieService.trailerKey && this.movieService.trailerClicked) {
        document.body.style.overflow = 'hidden';
      }
    }, 0);
  }
}
