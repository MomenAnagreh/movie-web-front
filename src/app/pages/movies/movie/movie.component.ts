import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies-service/movies.service';
import { Movie } from '../../../services/intefaces/movies';

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
    this.activatedRoute.paramMap.subscribe((data) => {
      this.movieService.getMovie(String(data.get('id'))).subscribe((data) => {
        this.movie = data as Movie;
      });
    });
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
