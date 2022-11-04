import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { delay, Observable } from 'rxjs';
import { MoviesService } from '../../services/movies-service/movies.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<any> {
  constructor(private readonly movieService: MoviesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.movieService.getMovie(route.params['id']).pipe(delay(2000));
  }
}
