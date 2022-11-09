import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';
import { Movie } from '../../../services/intefaces/movies';
import { MoviesService } from '../../../services/movies-service/movies.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css'],
})
export class MovieDisplayComponent implements OnInit {
  @Input() movie!: Movie;
  @ViewChildren('cards') cards!: QueryList<any>;
  clicked: boolean = false;

  constructor(
    public movieService: MoviesService,
    public router: Router,
    public userService: UsersService
  ) {}

  ngAfterViewChecked() {}

  ngOnInit(): void {}

  showVideo(key: string[]) {
    this.movieService.trailerKey = key;
    setTimeout(() => {
      this.movieService.trailerClicked = true;
      if (
        this.movieService.trailerKey.length &&
        this.movieService.trailerClicked
      ) {
        document.body.style.overflow = 'hidden';
      }
    }, 0);
  }

  goBack() {
    this.clicked = false;
    document.body.style.overflow = 'auto';
  }

  play() {
    this.clicked = true;
    document.body.style.overflow = 'hidden';
  }

  spinner(movie: Movie) {
    this.movieService.spinner = true;
    this.router.navigate(['movies/movie', movie.name.split(' ').join('-')], {
      state: { id: movie.id },
    });
  }

  addtoWishList(movie: Movie) {
    let added = true;
    this.userService.wishListMovies$.subscribe((results) => {
      results.forEach((item) => {
        if (item.id === Number(movie.id)) {
          added = false;
        }
      });
    });
    if (added) {
      this.userService.addToWishList(movie);
    }
  }

  removeFromWishList(id: number) {
    this.userService.removeFromWishList(id);
  }

  added(id: number) {
    let decide = true;
    this.userService.wishListMovies$.subscribe((items) => {
      items.forEach((movie) => {
        if (movie.id === id) {
          decide = false;
        }
      });
    });
    return decide;
  }
}
