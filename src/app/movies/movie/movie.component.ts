import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Movie } from 'src/app/intefaces/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: Movie;
  @ViewChildren('cards') cards!: QueryList<any>;

  constructor(public movieService: MoviesService) {}

  ngAfterViewChecked() {
    this.movieService.populerMovieList$.subscribe((arr) => {
      arr.forEach((movie) => {
        this.cards['_results'].map((elem: any) => {
          if (String(elem.nativeElement.id) === String(movie.id)) {
            elem.nativeElement.style.backgroundImage = `url(${movie.image})`;
          }
        });
      });
    });
  }

  ngOnInit(): void {}
}
