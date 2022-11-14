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
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MovieDetailGuard } from '../../core/guards/movie-detail.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviesComponent },
      {
        path: 'movie/:name',
        loadChildren: () =>
          import('../movies/movie/movie.module').then(
            (data) => data.MovieModule
          ),
        canActivate: [MovieDetailGuard],
      },
      {
        path: 'search',
        component: MovieSearchComponent,
      },
      {
        path: 'wishlist',
        component: WishListComponent,
      },
      {
        path: 'user',
        component: UserProfileComponent,
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
    MovieSearchComponent,
    WishListComponent,
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
