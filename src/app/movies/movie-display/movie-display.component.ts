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

  ngAfterViewChecked() {
    this.movieService.populerMovieList$.subscribe((arr) => {
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

  showVideo(key: string) {
    this.movieService.trailerKey = key;
    setTimeout(() => {
      this.movieService.trailerClicked = true;
      if (this.movieService.trailerKey && this.movieService.trailerClicked) {
        document.body.style.overflow = 'hidden';
      }
    }, 0);
  }

  // (data) => {
  //   this.movieService.mainImg = data[0];
  //   this.movieService
  //     .getProviders(String(data[0].id))
  //     .subscribe((providers: any) => {
  //       if (providers.results.US) {
  //         this.movieService.providerLink = providers.results.US.link;
  //       } else {
  //         Object.values(providers.results).forEach((elem: any, i: number) => {
  //           if (i === 0) this.movieService.providerLink = elem.link;
  //         });
  //       }
  //     });
  //
  // }
}
