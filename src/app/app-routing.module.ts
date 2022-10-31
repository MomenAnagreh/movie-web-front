import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SignInComponent },
  // { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  {
    path: 'movies',
    children: [
      { path: '', component: MoviesComponent },
      { path: 'movie/:id/:name', component: MovieComponent },
    ],
  },
  { path: 'movie', component: MovieComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
