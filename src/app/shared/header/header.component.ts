import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.userService.removeSelectedUser();
  }

  navigate() {
    this.router.navigate(['user']);
  }
}
