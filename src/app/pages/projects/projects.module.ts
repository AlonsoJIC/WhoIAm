import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from '../../components/projects/project.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      { path: '', component: ProjectsComponent }
    ])
  ]
})
export class ProjectsModule { }
