import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectDetailComponent } from './project-detail.component';

@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      { path: '', component: ProjectDetailComponent }
    ])
  ]
})
export class ProjectDetailModule { }
