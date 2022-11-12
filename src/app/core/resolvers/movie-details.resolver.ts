import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { MoviesService } from '../../services/movies-service/movies.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<any> {
  constructor(
    private readonly movieService: MoviesService,
    public router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    let time = 0;
    if (id !== localStorage.getItem('movieId')) {
      localStorage.setItem('movieId', id);
      this.movieService.spinner = true;
      time = 2000;
    }
    return this.movieService
      .getMovie(localStorage.getItem('movieId') as string)
      .pipe(delay(time));
  }
}
