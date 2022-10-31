import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Movie } from '../../services/intefaces/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css'],
})
export class MovieDisplayComponent implements OnInit {
  @Input() movie!: Movie;
  @ViewChildren('cards') cards!: QueryList<any>;
  clicked: boolean = false;

  constructor(public movieService: MoviesService) {}

  ngAfterViewChecked() {}

  ngOnInit(): void {}

  showVideo(key: string) {
    this.movieService.trailerKey = key;
    setTimeout(() => {
      this.movieService.trailerClicked = true;
      if (this.movieService.trailerKey && this.movieService.trailerClicked) {
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
}
