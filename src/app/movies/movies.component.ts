import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @ViewChildren('list') list!: QueryList<any>;

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getPopulerMovies().subscribe();

    this.movieService.getTrendingMovies().subscribe();
  }

  ngAfterViewInit() {}

  scrollRight(elem: any): void {
    let parentId = elem.target.parentElement.id;
    let elemenet = this.list['_results'];
    elemenet[parentId].nativeElement.scrollTo({
      left: elemenet[parentId].nativeElement.scrollLeft + 1700,
      behavior: 'smooth',
    });
  }

  scrollLeft(elem: any): void {
    let parentId = elem.target.parentElement.id;
    let elemenet = this.list['_results'];
    elemenet[parentId].nativeElement.scrollTo({
      left: elemenet[parentId].nativeElement.scrollLeft - 1700,
      behavior: 'smooth',
    });
  }
}
