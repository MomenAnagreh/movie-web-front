import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDisplayBarComponent } from './movie-display-bar/movie-display-bar.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieListHorizontalComponent } from './movie-list-horizontal/movie-list-horizontal.component';
import { MovieListVerticalComponent } from './movie-list-vertical/movie-list-vertical.component';
import { MoviesComponent } from './movies.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailsResolver } from '../../core/resolvers/movie-details.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviesComponent },
      {
        path: 'movie/:id/:name',
        loadChildren: () =>
          import('../movies/movie/movie.module').then(
            (data) => data.MovieModule
          ),
        resolve: {
          movie: MovieDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListVerticalComponent,
    MovieListHorizontalComponent,
    MovieCardComponent,
    MovieDisplayBarComponent,
    MovieDisplayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class MoviesModule {}
