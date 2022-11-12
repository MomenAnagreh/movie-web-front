import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthDto, Roles, User, UserLogin } from '../intefaces/contact';
import { Movie } from '../intefaces/movies';
import { MoviesService } from '../movies-service/movies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = {};
  private user$ = new BehaviorSubject<User>(this.user);

  private wishlist$ = new BehaviorSubject<Movie[]>([]);
  public wishlistMovies$ = this.wishlist$.asObservable();

  private jwtHelper = new JwtHelperService();

  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  private readonly backendAPI = 'http://localhost:4231/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly movieService: MoviesService
  ) {}

  get userValue(): User {
    return this.user$.value;
  }

  AddwishlistValues() {
    let wishlist: Movie[] = [];
    this.userValue.wishlist?.forEach((id) => {
      this.movieService.getMovie(id).subscribe((wish: Movie) => {
        wishlist = [...wishlist, wish];
        this.wishlist$.next(wishlist);
      });
    });
  }

  checkEmail(email: string) {
    return this.http.post(`${this.backendAPI}/check-email`, {
      email,
    });
  }

  addUser(info: User): Observable<AuthDto> {
    const user = {
      email: info.email,
      password: info.password,
      username: info.username,
      role: info.role,
      wishlist: [],
      color: this.generateColor(),
    };

    return this.http.post<AuthDto>(`${this.backendAPI}/signup`, user).pipe(
      tap(({ accessToken, role }: AuthDto) => {
        this.setUserValue({ accessToken, role });

        this.router.navigate(['/movies']);
      }),
      catchError((error) => {
        return throwError('Somthing went wrong during sign in', error);
      })
    );
  }

  login(user: UserLogin): Observable<AuthDto> {
    return this.http.post<AuthDto>(`${this.backendAPI}/signin`, user).pipe(
      tap(({ accessToken, role }: AuthDto) => {
        this.setUserValue({ accessToken, role });
        this.router.navigate(['/movies']);
      }),
      catchError((error) => {
        return throwError('Somthing went wrong during sign in', error);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');

    this.stopRefreshTokenTimer();

    this.user$.next({});
    this.wishlist$.next([]);
    this.movieService.pagePosition = 0;
    this.movieService.searchMovie('');
    this.router.navigate(['/signin']);
  }

  private setUserValue = ({ accessToken, role }: AuthDto) => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, color, wishlist, exp } =
      this.jwtHelper.decodeToken(accessToken);

    const user = {
      ...{ id, username, email, color, wishlist },
      jwtToken: accessToken,
      role: role,
    };

    this.user$.next(user);
    this.AddwishlistValues();
    this.startRefreshTokenTimer(exp);
  };

  private startRefreshTokenTimer(exp: string) {
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.user$.value.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }

  refreshToken(): Observable<AuthDto | string> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }

    const { email } = this.jwtHelper.decodeToken(currentToken);

    return this.http
      .post<AuthDto>(`${this.backendAPI}/refresh-token`, email)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValue({ accessToken, role });
        })
      );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  upgradeRole(userRole: { role: Roles }): Observable<AuthDto> {
    this.stopRefreshTokenTimer();

    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userValue.jwtToken}`
      ),
    };

    return this.http
      .patch<AuthDto>(
        `${this.backendAPI}/userupdate`,
        { role: userRole },
        header
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValue({ accessToken, role });
          this.router.navigate(['/movies/user']);
        }),
        catchError((error) => {
          return throwError('Somthing went wrong during sign in', error);
        })
      );
  }

  editWishList(id: String) {
    this.stopRefreshTokenTimer();

    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userValue.jwtToken}`
      ),
    };

    return this.http
      .patch<AuthDto>(`${this.backendAPI}/userupdate`, { wish: id }, header)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.wishlist$.next([]);
          this.setUserValue({ accessToken, role });
        }),
        catchError((error) => {
          return throwError('Somthing went wrong during sign in', error);
        })
      );
  }

  userExist(jwtToken: string) {
    this.stopRefreshTokenTimer();

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`),
    };

    return this.http
      .patch<AuthDto>(`${this.backendAPI}/userupdate`, {}, header)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValue({ accessToken, role });
          let id = localStorage.getItem('movieId');

          id
            ? this.movieService.getMovie(String(id)).subscribe((data) => {
                this.router.navigate(
                  ['movies/movie', data.name.split(' ').join('-')],
                  {
                    state: { id: localStorage.getItem('movieId') },
                  }
                );
              })
            : this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('Somthing went wrong during sign in', error);
        })
      );
  }

  deleteUser() {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.userValue.jwtToken}`
      ),
    };

    return this.http
      .post<any>(
        `${this.backendAPI}/deleteuser`,
        { email: this.userValue.email },
        header
      )
      .pipe(
        tap((result) => {
          if (result.status !== 401) {
            this.logout();
          }
          return result;
        }),
        catchError((error) => {
          console.log('in');
          return throwError('Somthing went wrong during sign in', error);
        })
      );
  }

  generateColor() {
    const num = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();

    return `#${num}`;
  }
}
