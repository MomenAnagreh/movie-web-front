import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list-horizontal',
  templateUrl: './movie-list-horizontal.component.html',
  styleUrls: ['./movie-list-horizontal.component.css'],
})
export class MovieListHorizontalComponent implements OnInit {
  @Input() movies: any;

  constructor() {}

  ngOnInit(): void {}
}
