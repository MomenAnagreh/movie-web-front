import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: any = '';
  isLoggedIn: boolean = false;

  constructor(public userService: UsersService) {}

  ngOnInit(): void {
    this.username = this.userService.getSelectedUser();
    this.isLoggedIn = this.userService.getIsLoggedIn();
  }

  logout() {
    this.username = '';
    this.isLoggedIn = false;
    this.userService.setIsLoggedIn(false);
    this.userService.removeSelectedUser();
  }
}
