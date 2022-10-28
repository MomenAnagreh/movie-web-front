import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-list-horizontal',
  templateUrl: './movie-list-horizontal.component.html',
  styleUrls: ['./movie-list-horizontal.component.css'],
})
export class MovieListHorizontalComponent implements OnInit {
  @Input() movies: any;
  @ViewChild('list') list!: ElementRef;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  scrollRight() {
    this.list.nativeElement.scrollTo({
      left: this.list.nativeElement.scrollLeft + 1500,
      behavior: 'smooth',
    });
  }

  scrollLeft() {
    this.list.nativeElement.scrollTo({
      left: this.list.nativeElement.scrollLeft - 1500,
      behavior: 'smooth',
    });
  }
}
