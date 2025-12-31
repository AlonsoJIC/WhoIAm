import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCacheInterceptor } from './interceptors/image-cache.interceptor';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsComponent } from './pages/projects/projects.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { ProjectComponent } from './components/projects/project.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { AboutProjectsComponent } from './components/about-projects/about-projects.component';
import { ButtonComponent } from './components/button/button.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { TrackingTableComponent } from './pages/tracking-table/tracking-table.component';

// Angular Material imports
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Import services for DI
import { ErrorHandlerService } from './services/error-handler.service';
import { SeoService } from './services/seo.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    LazyLoadImageModule,
    MatTableModule,
    MatProgressBarModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
    AboutMeComponent,
    AboutProjectsComponent,
    TechnologiesComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ButtonComponent,
    ContactMeComponent,
    TrackingTableComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ImageCacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
