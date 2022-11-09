import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users-service/users.service';
import { Movie } from '../../../services/intefaces/movies';
import { MoviesService } from '../../../services/movies-service/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  @ViewChildren('cards') cards!: QueryList<any>;
  current!: any;
  @ViewChild('readMoreBtn') readMoreBtn!: any;
  private url: string = 'https://www.themoviedb.org/movie/';

  constructor(
    public movieService: MoviesService,
    private router: Router,
    public userService: UsersService
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  onMouseEnter() {
    this.readMoreBtn.nativeElement.style.visibility = 'visible';
  }

  onMouseLeave() {
    this.readMoreBtn.nativeElement.style.visibility = 'hidden';
  }

  readMore(movie: Movie) {
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
