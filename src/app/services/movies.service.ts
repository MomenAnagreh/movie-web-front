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

  private allMovies: Movie[] = [];
  private allMovies$ = new BehaviorSubject<Movie[]>(this.allMovies);
  allMoviesList$ = this.allMovies$.asObservable();

  private readonly apiKey = 'b95dcb00aa819377efa7b1750dbad947';
  private readonly populerAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
  private readonly trendingAPI = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.apiKey}&page=`;
  private readonly imageURL = 'https://image.tmdb.org/t/p/w500';
  private readonly discovrAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;

  constructor(private readonly http: HttpClient) {}

  getMovies(name: string, page: number = 1) {
    let baseApi = '';
    if (name === 'populerMovies') baseApi = this.populerAPI;
    else if (name === 'trendingMovies') baseApi = this.trendingAPI;
    else if (name === 'discovrMovies') baseApi = this.discovrAPI;
    return this.http.get<MoviesResponse>(baseApi + String(page)).pipe(
      map((movies: MoviesResponse): any => {
        return movies.results.map((item: MoviesResults) => {
          const movie = {
            id: item.id,
            name: item.original_title
              ? item.original_title
              : item.original_name,
            overview: item.overview,
            image: this.imageURL + item.poster_path,
            backdrop_path: this.imageURL + item.backdrop_path,
            release_date: item.release_date
              ? item.release_date.slice(0, 4)
              : 'null',
            original_language: item.original_language,
            vote_average: item.vote_average.toFixed(1),
          };
          return movie;
        });
      }),
      tap((movies: Movie[]) => {
        if (name === 'populerMovies') {
          this.populerMovies = movies;
          this.populerMovies$.next(
            this.populerMovies.sort(() => Math.random() - 0.5)
          );
        } else if (name === 'trendingMovies') {
          this.trendingMovies = movies;
          this.trendingMovies$.next(
            this.trendingMovies.sort(() => Math.random() - 0.5)
          );
        } else if (name === 'discovrMovies') {
          this.allMovies = [...this.allMovies, ...movies];
          this.allMovies$.next(this.allMovies);
        }
      })
    );
  }
}
