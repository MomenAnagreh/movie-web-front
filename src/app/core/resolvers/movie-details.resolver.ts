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
    if (id) {
      return this.movieService.getMovie(id).pipe(delay(2000));
    } else {
      this.router.navigate(['/movies']);
    }
    return of(0);
  }
}
