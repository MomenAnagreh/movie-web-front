import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  isLoggedIn: boolean = false;

  constructor() {}
}
