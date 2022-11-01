import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDisplayBarComponent } from './movie-display-bar.component';

describe('MovieDisplayBarComponent', () => {
  let component: MovieDisplayBarComponent;
  let fixture: ComponentFixture<MovieDisplayBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDisplayBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDisplayBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
