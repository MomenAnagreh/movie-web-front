import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListHorizontalComponent } from './movie-list-horizontal.component';

describe('MovieListHorizontalComponent', () => {
  let component: MovieListHorizontalComponent;
  let fixture: ComponentFixture<MovieListHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
