import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../services/intefaces/movies';
import { UsersService } from '../../../services/users-service/users.service';
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
    public movieService: MoviesService,
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie'];
    this.movieService.spinner = false;
  }

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
