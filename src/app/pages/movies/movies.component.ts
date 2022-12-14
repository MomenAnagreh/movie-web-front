import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies-service/movies.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  trailerClicked: boolean = false;
  windowScrolled: boolean = false;

  playerConfig = {
    autoplay: 1,
  };

  constructor(
    public movieService: MoviesService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.movieService.getMovies('topRatedMovies').subscribe();

    this.movieService.getMovies('populerMovies').subscribe();

    this.movieService.getMovies('trendingMovies').subscribe();

    this.movieService.getMovies('discovrMovies', 1).subscribe();

    localStorage.removeItem('movieId');
  }

  ngAfterViewInit() {
    window.scrollTo(0, this.movieService.pagePosition);
  }

  onScroll() {
    let currentPage = this.movieService.pages.length + 1;
    this.movieService.getMovies('discovrMovies', currentPage).subscribe();
  }

  goBack() {
    this.movieService.trailerClicked = false;
    document.body.style.overflow = 'auto';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.movieService.pagePosition = window.pageYOffset;
    if (window.pageYOffset > 100) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
