import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies-service/movies.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @ViewChildren('tabs') tabs!: QueryList<any>;
  movieTabShow: boolean = false;
  storedId: string | null = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {}

  ngAfterContentChecked() {
    if (this.router.url === '/movies/search') {
      this.changeColor('1');
    }
    if (this.router.url === '/movies') {
      this.changeColor('2');
    }
    if (this.router.url === '/movies/wishlist') {
      this.changeColor('3');
    }
    if (this.router.url === '/movies/user') {
      this.changeColor('4');
    }
    if (this.router.url.includes('movies/movie')) {
      this.storedId = localStorage.getItem('movieId');
      document.querySelectorAll<HTMLElement>('.iconWrapper')[3].style.display =
        'flex';
      let doc = document.querySelectorAll<HTMLElement>('.mainWrapper');
      doc[0].style.height = '700px';
      this.changeColor('5');
      this.movieTabShow = true;
    }
  }

  navigate(name: string = '') {
    if (name === 'movie') {
      this.movieService.getMovie(String(this.storedId)).subscribe((data) => {
        this.router.navigate(
          [`movies/${name}`, data.name.split(' ').join('-')],
          {
            state: { id: this.storedId },
          }
        );
      });
    } else {
      this.router.navigate([`movies/${name}`]);
    }
  }

  changeColor(id: string) {
    this.tabs.map((data) => {
      const classlist = data.nativeElement.classList;

      if (data.nativeElement.id === id) {
        classlist.remove('iconWrapper');
        classlist.add('iconWrapper2');
      } else {
        classlist.remove('iconWrapper2');
        classlist.add('iconWrapper');
      }
    });
  }
}
