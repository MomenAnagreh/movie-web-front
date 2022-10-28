import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list-vertical',
  templateUrl: './movie-list-vertical.component.html',
  styleUrls: ['./movie-list-vertical.component.css'],
})
export class MovieListVerticalComponent implements OnInit {
  @Input() movies: any;

  constructor() {}

  ngOnInit(): void {}
}
