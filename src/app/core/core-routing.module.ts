import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gurads/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/home-page/home-page.module').then(
        (data) => data.HomePageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('../pages/sign-in/sign-in.module').then(
        (data) => data.SignInModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../pages/register/register.module').then(
        (data) => data.RegisterModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('../pages/movies/movies.module').then((data) => data.MoviesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/page-not-found/page-not-found.module').then(
        (data) => data.PageNotFoundModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
