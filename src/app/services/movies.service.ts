import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  Movie,
  MoviesResponse,
  MoviesResults,
  Trailer,
} from './intefaces/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  trailerKey: string = '';
  trailerClicked: boolean = false;

  private populerMovies: Movie[] = [];
  private populerMovies$ = new BehaviorSubject<Movie[]>(this.populerMovies);
  populerMovieList$ = this.populerMovies$.asObservable();

  private trendingMovies: Movie[] = [];
  private trendingMovies$ = new BehaviorSubject<Movie[]>(this.trendingMovies);
  trendingMovieList$ = this.trendingMovies$.asObservable();

  private allMovies: Movie[] = [];
  private allMovies$ = new BehaviorSubject<Movie[]>(this.allMovies);
  allMoviesList$ = this.allMovies$.asObservable();

  private topRatedMovies: Movie[] = [];
  private topRatedMovies$ = new BehaviorSubject<Movie[]>(this.topRatedMovies);
  topRatedMoviesList$ = this.topRatedMovies$.asObservable();

  private readonly apiKey = 'b95dcb00aa819377efa7b1750dbad947';
  private readonly movieApi = 'https://api.themoviedb.org/3/movie/';
  private readonly longApiKey = `?api_key=${this.apiKey}`;
  private readonly populerAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
  private readonly trendingAPI = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.apiKey}&page=`;
  private readonly imageURL = 'https://image.tmdb.org/t/p/w500';
  private readonly discovrAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
  private readonly trailerAPI = `/videos?api_key=${this.apiKey}`;
  private readonly providersAPIFirst = 'https://api.themoviedb.org/3/movie/';
  private readonly providersAPISecond = `/watch/providers?api_key=${this.apiKey}`;
  private readonly topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&page=`;

  constructor(private readonly http: HttpClient) {}

  getMovies(name: string, page: number = 1) {
    let baseApi = '';
    if (name === 'populerMovies') baseApi = this.populerAPI;
    else if (name === 'trendingMovies') baseApi = this.trendingAPI;
    else if (name === 'discovrMovies') baseApi = this.discovrAPI;
    else if (name === 'topRatedMovies') baseApi = this.topRatedAPI;

    return this.http.get<MoviesResponse>(baseApi + String(page)).pipe(
      map((movies: MoviesResponse): any => {
        return movies.results.map((item: MoviesResults) => {
          const movie = {
            id: item.id,
            name: item.original_title
              ? item.original_title.toLowerCase()
              : item.original_name.toLowerCase(),
            overview: item.overview,
            image: this.imageURL + item.poster_path,
            backdrop_path: this.imageURL + item.backdrop_path,
            release_date: item.release_date
              ? item.release_date.slice(0, 4)
              : 'null',
            original_language: item.original_language,
            vote_average: item.vote_average.toFixed(1),
            trailerKey: '',
            watch: '',
            movieLink: null,
          };

          if (name !== 'trendingMovies') {
            this.getTrailer(String(item.id)).subscribe((data: any) => {
              data.subscribe((item: any) => {
                item.results.forEach((trail: any) => {
                  if (trail.type === 'Trailer') {
                    movie.trailerKey = trail.key;
                    if (this.trailerKey && this.trailerClicked) {
                      document.body.style.overflow = 'hidden';
                    }
                  }
                });
              });
            });
            this.getProviders(String(item.id)).subscribe((data: any) => {
              data.subscribe((elem: Trailer) => {
                for (let [key, value] of Object.entries(elem.results)) {
                  if (key === 'US') movie.watch = value['link'];
                }
              });
            });
          }

          if (movie.name === 'black adam') {
            movie.watch = 'https://www.liiivideo.com/embed-x88jaq174i46.html';
          }

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
        } else if (name === 'topRatedMovies') {
          this.topRatedMovies = movies;
          this.topRatedMovies$.next(
            this.topRatedMovies.sort(() => Math.random() - 0.5)
          );
        }
      })
    );
  }

  getMovie(id: string) {
    return this.http.get<MoviesResults>(this.movieApi + id + this.longApiKey);
  }

  getTrailer(id: string) {
    return this.http.get<Trailer>(this.movieApi + id + this.trailerAPI).pipe(
      switchMap(async (value) => {
        let obs1$ = from([value]);

        return obs1$.pipe(
          map((value) => {
            if (!value) {
              throw new Error('cannot get');
            }
            return value;
          }),
          catchError((error) => {
            let obs2$ = of(error);
            return obs2$;
          })
        );
      })
    );
  }

  getProviders(id: string) {
    return this.http
      .get<Trailer>(this.providersAPIFirst + id + this.providersAPISecond)
      .pipe(
        switchMap(async (value) => {
          let obs1$ = from([value]);

          return obs1$.pipe(
            map((value) => {
              if (!value) {
                throw new Error('cannot get');
              }
              return value;
            }),
            catchError((error) => {
              let obs2$ = of(error);
              return obs2$;
            })
          );
        })
      );
  }
}
