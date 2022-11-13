import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  started: boolean = false;
  tempStop: boolean = false;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {
    this.movies.subscribe((data: Movie[]) => {
      this.movies = data;
    });
    this.index = Number(localStorage.getItem('lastMovie'));
    localStorage.removeItem('lastMovie');
    this.startInterval();
  }

  ngAfterViewChecked() {
    if (this.movieService.spinner || this.movieService.trailerClicked) {
      this.tempStop = true;
      this.stopInterval();
    } else if (this.tempStop && !this.started) {
      this.startInterval();
      this.tempStop = false;
    }
  }

  ngOnDestroy() {
    this.stopInterval();
    localStorage.setItem('lastMovie', String(this.index));
  }

  scrollRight() {
    if (this.index < this.movies.length - 1) {
      this.movieService.trailerKey = [];
      this.movieService.trailerClicked = false;
      this.stopInterval();

      this.index++;
    }
    this.stopInterval();
  }

  scrollLeft() {
    if (this.index > 0) {
      this.movieService.trailerKey = [];
      this.movieService.trailerClicked = false;

      this.index--;
    }
  }

  startInterval() {
    this.started = true;
    this.movieInterval = setInterval(() => {
      if (this.index < this.movies.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    }, 5000);
  }

  stopInterval() {
    this.started = false;
    clearInterval(this.movieInterval);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset < 400 && !this.started) {
      this.startInterval();
    }
    if (window.pageYOffset > 400) {
      this.stopInterval();
    }
  }
}
