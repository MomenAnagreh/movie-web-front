import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @ViewChildren('tabs') tabs!: QueryList<any>;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  navigate(name: string, id: string) {
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
    this.router.navigate([`movies/${name}`]);
  }

  navUser(id: string) {
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
    this.router.navigate(['movies/user']);
  }
}
