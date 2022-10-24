import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services/home-page.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: any = '';

  constructor(
    public homePageService: HomePageService,
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.users.map((user) => {
      if (user.selected) this.username = user.email;
    });
  }
}
