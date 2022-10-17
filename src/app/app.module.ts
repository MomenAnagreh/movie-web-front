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
    LangSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
