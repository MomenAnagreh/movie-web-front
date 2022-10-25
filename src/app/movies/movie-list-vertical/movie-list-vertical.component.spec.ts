import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListVerticalComponent } from './movie-list-vertical.component';

describe('MovieListVerticalComponent', () => {
  let component: MovieListVerticalComponent;
  let fixture: ComponentFixture<MovieListVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
