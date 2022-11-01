import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDisplayBarComponent } from './movie-display-bar/movie-display-bar.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieListHorizontalComponent } from './movie-list-horizontal/movie-list-horizontal.component';
import { MovieListVerticalComponent } from './movie-list-vertical/movie-list-vertical.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player/youtube-player.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviesComponent },
      { path: 'movie/:id/:name', component: MovieComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListVerticalComponent,
    MovieComponent,
    MovieListHorizontalComponent,
    MovieCardComponent,
    MovieDisplayBarComponent,
    MovieDisplayComponent,
    YoutubePlayerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    YouTubePlayerModule,
    InfiniteScrollModule,
  ],
  exports: [RouterModule],
})
export class MoviesModule {}
