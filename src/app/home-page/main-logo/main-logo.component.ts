import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.css'],
})
export class MainLogoComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public userService: UsersService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.getIsLoggedIn();
  }
}
