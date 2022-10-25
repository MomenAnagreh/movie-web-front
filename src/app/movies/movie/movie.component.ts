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
      this.addBackgroundImg(arr);
    });

    this.movieService.trendingMovieList$.subscribe((arr) => {
      this.addBackgroundImg(arr);
    });

    this.movieService.allMoviesList$.subscribe((arr) => {
      this.addBackgroundImg(arr);
    });
  }

  ngOnInit(): void {}

  changeImage(elem: any) {
    let current = elem.target;

    while (
      String(current.attributes.class.value).toLowerCase() !=
      'movieCardWrapper'.toLowerCase()
    ) {
      current = current.parentNode;
    }

    console.log(current.attributes.id);

    this.movieService
      .getMovie(current.attributes.id.value)
      .subscribe((item: any) => this.movieService.setMainImg(item.poster_path));
  }

  addBackgroundImg(arr: Movie[]) {
    arr.forEach((movie) => {
      this.cards['_results'].map((elem: any) => {
        if (String(elem.nativeElement.id) === String(movie.id)) {
          elem.nativeElement.style.backgroundImage = `url(${movie.image})`;
        }
      });
    });
  }
}
