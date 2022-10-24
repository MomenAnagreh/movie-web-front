import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Movie, MoviesResponse, MoviesResults } from '../intefaces/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private populerMovies: Movie[] = [];
  private populerMovies$ = new BehaviorSubject<Movie[]>(this.populerMovies);
  populerMovieList$ = this.populerMovies$.asObservable();

  private trendingMovies: Movie[] = [];
  private trendingMovies$ = new BehaviorSubject<Movie[]>(this.trendingMovies);
  trendingMovieList$ = this.trendingMovies$.asObservable();

  private readonly apiKey = 'b95dcb00aa819377efa7b1750dbad947';
  private readonly movieApi = `https://api.themoviedb.org/3/movie/550?api_key=${this.apiKey}`;
  private readonly populerAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
  private readonly trendingAPI = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.apiKey}`;
  private readonly imageURL = 'https://image.tmdb.org/t/p/w500';

  constructor(private readonly http: HttpClient) {}

  getPopulerMovies() {
    return this.http.get<MoviesResponse>(this.populerAPI).pipe(
      map((movies: MoviesResponse): any => {
        return movies.results.map((item: MoviesResults) => {
          const movie = {
            id: item.id,
            name: item.original_title,
            overview: item.overview,
            image: this.imageURL + item.poster_path,
          };
          return movie;
        });
      }),
      tap((movies: Movie[]) => {
        this.populerMovies = movies;
        this.populerMovies$.next(
          this.populerMovies.sort(() => Math.random() - 0.5)
        );
      })
    );
  }

  getTrendingMovies() {
    return this.http.get<MoviesResponse>(this.trendingAPI).pipe(
      map((movies: MoviesResponse): any => {
        return movies.results.map((item: MoviesResults) => {
          const movie = {
            id: item.id,
            name: item.original_title,
            overview: item.overview,
            image: this.imageURL + item.poster_path,
          };
          return movie;
        });
      }),
      tap((movies: Movie[]) => {
        this.trendingMovies = movies;
        this.trendingMovies$.next(
          this.trendingMovies.sort(() => Math.random() - 0.5)
        );
      })
    );
  }
}
