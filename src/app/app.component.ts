import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movie-web-front';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.authService
        .userExist(
          localStorage.getItem('access_token') as string,
          localStorage.getItem('movieId') as string
        )
        .subscribe();
    }
  }
}
