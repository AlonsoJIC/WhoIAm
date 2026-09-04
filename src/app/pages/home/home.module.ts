import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutMeComponent } from '../../components/about-me/about-me.component';
import { AboutProjectsComponent } from '../../components/about-projects/about-projects.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { TechnologiesComponent } from '../../components/technologies/technologies.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    AboutProjectsComponent,
    ButtonComponent,
    ContactMeComponent,
    TechnologiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ]
})
export class HomeModule { }
