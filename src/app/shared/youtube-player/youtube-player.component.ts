import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies-service/movies.service';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
})
export class YoutubePlayerComponent implements OnInit {
  key: number = 0;

  playerConfig = {
    autoplay: 1,
  };

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {}

  goBack() {
    this.movieService.trailerClicked = false;
    this.key = 0;
    document.body.style.overflow = 'auto';
  }

  scrollRight() {
    if (this.key < this.movieService.trailerKey.length - 1) {
      this.key = this.key + 1;
    }
  }

  scrollLeft() {
    if (this.key > 0) {
      this.key = this.key - 1;
    }
  }
}
