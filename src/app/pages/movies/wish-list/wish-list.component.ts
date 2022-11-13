import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  clearAll() {
    this.authService.clearWishList().subscribe();
  }
}
