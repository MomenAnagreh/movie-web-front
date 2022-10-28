import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  page: number = 1;
  trailerClicked: boolean = false;
  windowScrolled: boolean = false;

  playerConfig = {
    autoplay: 1,
  };

  constructor(
    public movieService: MoviesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.movieService.getMovies('topRatedMovies').subscribe();

    this.movieService.getMovies('populerMovies').subscribe();

    this.movieService.getMovies('trendingMovies').subscribe();

    this.movieService.getMovies('discovrMovies', this.page).subscribe();
  }

  onScroll() {
    this.movieService.getMovies('discovrMovies', ++this.page).subscribe();
  }

  goBack() {
    this.movieService.trailerClicked = false;
    document.body.style.overflow = 'auto';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
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
