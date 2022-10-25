import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Movie, Trailer } from 'src/app/intefaces/movies';
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

  addBackgroundImg(arr: Movie[]) {
    arr.forEach((movie) => {
      this.cards['_results'].map((elem: any) => {
        if (String(elem.nativeElement.id) === String(movie.id)) {
          elem.nativeElement.style.backgroundImage = `url(${movie.image})`;
        }
      });
    });
  }

  onClick(elem: any) {
    let current = elem.target;
    this.movieService.trailerKey = '';
    this.movieService.trailerClicked = false;

    while (
      String(current.attributes.class.value).toLowerCase() !=
      'movieCardWrapper'.toLowerCase()
    ) {
      current = current.parentNode;
    }

    this.movieService
      .getMovie(current.attributes.id.value)
      .subscribe((item: any) =>
        this.movieService.setMainImg({
          id: item.id,
          name: item.original_title ? item.original_title : item.original_name,
          overview: item.overview,
          image: item.poster_path,
        })
      );

    this.movieService
      .getTrailer(current.attributes.id.value)
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          data.results.forEach((trail: any) => {
            if (trail.name === 'Official Trailer') {
              this.movieService.trailerKey = trail.key;
            }
          });
        }
      });
  }
}
