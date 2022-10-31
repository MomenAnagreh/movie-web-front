import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-display-bar',
  templateUrl: './movie-display-bar.component.html',
  styleUrls: ['./movie-display-bar.component.css'],
})
export class MovieDisplayBarComponent implements OnInit {
  @Input() movies: any;
  @ViewChild('list') list!: ElementRef;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  scrollRight() {
    this.movieService.trailerKey = '';
    this.movieService.trailerClicked = false;

    this.list.nativeElement.scrollTo({
      left: this.list.nativeElement.scrollLeft + 1991.5,
      behavior: 'auto',
    });
  }

  scrollLeft() {
    this.movieService.trailerKey = '';
    this.movieService.trailerClicked = false;

    this.list.nativeElement.scrollTo({
      left: this.list.nativeElement.scrollLeft - 1991,
      behavior: 'auto',
    });
  }
}
