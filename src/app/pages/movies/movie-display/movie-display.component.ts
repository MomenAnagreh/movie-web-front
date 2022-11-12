import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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
    public authService: AuthService
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
    if (this.authService.userValue.role !== 'USER') {
      this.movieService.spinner = true;
    }
    this.router.navigate(['movies/movie', movie.name.split(' ').join('-')], {
      state: { id: movie.id },
    });
  }

  editWishList(id: number) {
    this.authService.editWishList(String(id)).subscribe();
  }

  added(id: number) {
    return this.authService.userValue.wishlist?.includes(String(id));
  }
}
