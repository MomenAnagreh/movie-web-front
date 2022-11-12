import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
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
    public authService: AuthService
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
