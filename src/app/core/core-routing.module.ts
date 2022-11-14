import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/home-page/home-page.module').then(
        (data) => data.HomePageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('../pages/sign-in/sign-in.module').then(
        (data) => data.SignInModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('../pages/register/register.module').then(
        (data) => data.RegisterModule
      ),
    canActivate: [LoginGuard],
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
