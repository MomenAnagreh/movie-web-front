import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Movie } from '../../services/intefaces/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css'],
})
export class MovieDisplayComponent implements OnInit {
  @Input() movie!: Movie;
  @ViewChildren('cards') cards!: QueryList<any>;

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
}
