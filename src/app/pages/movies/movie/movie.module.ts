import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { SharedModule } from '../../../shared/shared.module';
import { MovieDetailsResolver } from '../../../core/resolvers/movie-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    resolve: {
      movie: MovieDetailsResolver,
    },
  },
];

@NgModule({
  declarations: [MovieComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MovieModule {}
