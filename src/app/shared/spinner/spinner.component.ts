import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies-service/movies.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}
}
