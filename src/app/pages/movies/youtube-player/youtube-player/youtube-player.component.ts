import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../../services/movies-service/movies.service';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
})
export class YoutubePlayerComponent implements OnInit {
  playerConfig = {
    autoplay: 1,
  };

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  goBack() {
    this.movieService.trailerClicked = false;
    document.body.style.overflow = 'auto';
  }
}
