import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core/core-routing.module';
import { LangSelectComponent } from './pages/home-page/lang-select/lang-select.component';
import { MainLogoComponent } from './pages/home-page/main-logo/main-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLogoComponent,
    LangSelectComponent,
  ],
  imports: [BrowserModule, HttpClientModule, CoreRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
