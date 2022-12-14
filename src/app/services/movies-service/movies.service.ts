import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  Cast,
  Movie,
  MovieDetails,
  MoviesResponse,
  MoviesResults,
  Trailer,
} from '../intefaces/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  trailerKey: string[] = [];
  trailerClicked: boolean = false;
  spinner: boolean = false;
  pagePosition: number = 0;
  pages: number[] = [];

  private foundMovies: Movie[] = [];
  private foundMovies$ = new BehaviorSubject<Movie[]>(this.foundMovies);
  foundMoviesList$ = this.foundMovies$.asObservable();

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
            release_date: item.release_date ? item.release_date : 'null',
            original_language: item.original_language,
            vote_average: item.vote_average.toFixed(1),
            trailerKey: [] as String[],
            watch: '',
          };

          if (name !== 'trendingMovies') {
            this.getTrailer(String(item.id)).subscribe((data: any) => {
              data.results.forEach((trail: any) => {
                movie.trailerKey.push(trail.key);
              });
            });
            this.getProviders(String(item.id)).subscribe((data: any) => {
              for (const key in data.results) {
                if (key === 'US') movie.watch = data.results[key].link;
              }
            });
          }

          return movie;
        });
      }),
      tap((movies: Movie[]) => {
        if (name === 'populerMovies') {
          this.populerMovies = movies;
          this.populerMovies$.next(this.populerMovies.reverse());
        } else if (name === 'trendingMovies') {
          this.trendingMovies = movies;
          this.trendingMovies$.next(this.trendingMovies);
        } else if (name === 'discovrMovies') {
          if (!this.pages.includes(page)) {
            this.allMovies = [...this.allMovies, ...movies];
            this.allMovies$.next(this.allMovies);
            this.pages.push(page);
          }
        } else if (name === 'topRatedMovies') {
          this.topRatedMovies = movies;
          this.topRatedMovies$.next(this.topRatedMovies);
        }
      })
    );
  }

  getMovie(id: string) {
    return this.http
      .get<MovieDetails>(this.movieApi + id + this.longApiKey)
      .pipe(
        map((item: MovieDetails): any => {
          const movie = {
            id: item.id,
            backdrop_path: this.imageURL + item.backdrop_path,
            image: this.imageURL + item.poster_path,
            name: item.original_title.toLowerCase(),
            release_date: item.release_date ? item.release_date : 'null',
            original_language: item.original_language,
            genres: item.genres,
            runtime: String(item.runtime),
            vote_average: item.vote_average.toFixed(1),
            vote_count: item.vote_count,
            trailerKey: [] as String[],
            overview: item.overview,
            cast: [] as Cast[],
            watch: '',
          };
          movie.runtime =
            String(Math.floor(Number(movie.runtime) / 60)) +
            'h ' +
            String(
              (
                (Number(movie.runtime) / 60 -
                  Math.floor(Number(movie.runtime) / 60)) *
                60
              ).toFixed(0)
            ) +
            'm';

          this.getTrailer(String(item.id)).subscribe((data: any) => {
            data.results.forEach((trail: any) => {
              movie.trailerKey.push(trail.key);
            });
          });

          this.getCast(String(item.id)).subscribe((data: any) => {
            data.cast.map((actor: any) => {
              if (actor.profile_path !== null) {
                let result = {
                  name: actor.name,
                  picture: this.imageURL + actor.profile_path,
                  character: actor.character,
                };
                movie.cast.push(result);
              }
            });
          });
          return movie;
        })
      );
  }

  getTrailer(id: string) {
    return this.http
      .get<Trailer>(this.movieApi + id + this.trailerAPI)
      .pipe(catchError((err) => of(false)));
  }

  getProviders(id: string) {
    return this.http
      .get<Trailer>(this.providersAPIFirst + id + this.providersAPISecond)
      .pipe(catchError((err) => of(false)));
  }

  getCast(id: string) {
    return this.http
      .get<Trailer>(this.movieApi + id + '/credits' + this.longApiKey)
      .pipe(catchError((err) => of(false)));
  }

  searchMovie(name: string) {
    this.foundMovies = [];
    this.foundMovies$.next(this.foundMovies);
    let page = name ? 1 : 500;
    while (page < 500 && this.foundMovies.length === 0) {
      this.http
        .get<MoviesResponse>(this.discovrAPI + page)
        .pipe(
          map((movies: MoviesResponse): any => {
            return movies.results.map((item: MoviesResults) => {
              let movie = {
                id: item.id,
                name: item.original_title
                  ? item.original_title.toLowerCase()
                  : item.original_name.toLowerCase(),
                overview: item.overview,
                image: item.poster_path
                  ? this.imageURL + item.poster_path
                  : 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
                backdrop_path: this.imageURL + item.backdrop_path,
                release_date: item.release_date ? item.release_date : 'null',
                original_language: item.original_language,
                vote_average: item.vote_average,
                trailerKey: [] as String[],
                watch: '',
              };
              if (!movie.name.includes(name)) {
                movie = {} as Movie;
              }
              return movie;
            });
          }),
          catchError((err) => {
            return of(0);
          })
        )
        .subscribe((data) => {
          data.map((item: Movie) => {
            if (item.name) {
              item.vote_average = Number(item.vote_average.toFixed(1));
              this.foundMovies = [...this.foundMovies, item];
              this.foundMovies$.next(this.foundMovies);
            }
          });
        });
      page++;
    }
  }
}
