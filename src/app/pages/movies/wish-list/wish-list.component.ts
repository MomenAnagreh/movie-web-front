import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users-service/users.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(public userService: UsersService) {}

  ngOnInit(): void {}
}
