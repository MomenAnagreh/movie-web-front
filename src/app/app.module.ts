import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GetStartedComponent } from './home-page/get-started/get-started.component';
import { DisplayComponent } from './home-page/display/display.component';
import { HeaderComponent } from './home-page/header/header.component';
import { FrequentlyAskedQuestionsComponent } from './home-page/frequently-asked-questions/frequently-asked-questions.component';
import { SigninFormComponent } from './home-page/signin-form/signin-form.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { LangSelectComponent } from './home-page/lang-select/lang-select.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainLogoComponent } from './home-page/main-logo/main-logo.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './movies/movies.component';
import { AuthGuard } from './auth.guard';
import { MovieListVerticalComponent } from './movies/movie-list-vertical/movie-list-vertical.component';
import { MovieComponent } from './movies/movie/movie.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieListHorizontalComponent } from './movies/movie-list-horizontal/movie-list-horizontal.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { MovieDisplayBarComponent } from './movies/movie-display-bar/movie-display-bar.component';
import { MovieDisplayComponent } from './movies/movie-display/movie-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GetStartedComponent,
    DisplayComponent,
    HeaderComponent,
    FrequentlyAskedQuestionsComponent,
    SigninFormComponent,
    FooterComponent,
    LangSelectComponent,
    SignInComponent,
    MainLogoComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MoviesComponent,
    MovieListVerticalComponent,
    MovieComponent,
    MovieListHorizontalComponent,
    MovieCardComponent,
    MovieDisplayBarComponent,
    MovieDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
