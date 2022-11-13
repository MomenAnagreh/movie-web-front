import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/services/intefaces/movies';
import { MoviesService } from '../../../services/movies-service/movies.service';

@Component({
  selector: 'app-movie-display-bar',
  templateUrl: './movie-display-bar.component.html',
  styleUrls: ['./movie-display-bar.component.css'],
})
export class MovieDisplayBarComponent implements OnInit {
  @Input() movies: any;
  @ViewChild('list') list!: ElementRef;
  index: number = 0;
  movieInterval!: any;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {
    this.movies.subscribe((data: Movie[]) => {
      this.movies = data;
    });
    this.index = Number(localStorage.getItem('lastMovie'));
    localStorage.removeItem('lastMovie');
    this.movieInterval = setInterval(() => {
      if (this.index < this.movies.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    }, 5000);
  }

  ngAfterViewChecked() {
    if (this.movieService.spinner || this.movieService.trailerClicked) {
      clearInterval(this.movieInterval);
    }
  }

  ngOnDestroy() {
    clearInterval(this.movieInterval);
    localStorage.setItem('lastMovie', String(this.index));
  }

  scrollRight() {
    if (this.index < this.movies.length - 1) {
      this.movieService.trailerKey = [];
      this.movieService.trailerClicked = false;
      clearInterval(this.movieInterval);

      this.index++;
    }
  }

  scrollLeft() {
    if (this.index > 0) {
      this.movieService.trailerKey = [];
      this.movieService.trailerClicked = false;
      clearInterval(this.movieInterval);

      this.index--;
    }
  }
}
