import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayComponent } from './display/display.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HomePageComponent } from './home-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
    DisplayComponent,
    FrequentlyAskedQuestionsComponent,
    GetStartedComponent,
    SigninFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // ReactiveFormsModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
