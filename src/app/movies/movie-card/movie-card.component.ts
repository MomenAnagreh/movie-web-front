import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Movie } from '../../services/intefaces/movies';
import { MoviesService } from 'src/app/services/movies.service';

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

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  onMouseEnter() {
    this.readMoreBtn.nativeElement.style.visibility = 'visible';
  }

  onMouseLeave() {
    this.readMoreBtn.nativeElement.style.visibility = 'hidden';
  }

  readMore(movie: Movie) {
    window.open(this.url + `${movie.id} - ${movie.name}`, '_blank');
  }
}
