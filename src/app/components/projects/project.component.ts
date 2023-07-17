import { Component } from '@angular/core';
import { PROJECTS } from '../../models/projects.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  project = PROJECTS;

}

