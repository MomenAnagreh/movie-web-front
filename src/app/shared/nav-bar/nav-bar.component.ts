import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(public userService: UsersService, public router: Router) {}

  ngOnInit(): void {}

  navigate(name: string = '') {
    this.router.navigate([`movies/${name}`]);
  }

  navUser() {
    this.router.navigate(['user']);
  }
}
