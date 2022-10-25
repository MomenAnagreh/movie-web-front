import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-list-vertical',
  templateUrl: './movie-list-vertical.component.html',
  styleUrls: ['./movie-list-vertical.component.css'],
})
export class MovieListVerticalComponent implements OnInit {
  @Input() movies: any;
  @ViewChildren('list') list!: QueryList<any>;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  scrollRight(elem: any): void {
    let parentId = elem.target.parentElement.id;
    let element = this.list['_results'];
    element[parentId].nativeElement.scrollTo({
      left: element[parentId].nativeElement.scrollLeft + 1500,
      behavior: 'smooth',
    });
  }

  scrollLeft(elem: any): void {
    let parentId = elem.target.parentElement.id;
    let elemenet = this.list['_results'];
    elemenet[parentId].nativeElement.scrollTo({
      left: elemenet[parentId].nativeElement.scrollLeft - 1500,
      behavior: 'smooth',
    });
  }
}
