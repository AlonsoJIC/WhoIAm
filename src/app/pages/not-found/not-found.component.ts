import { Component } from '@angular/core';
import { PROJECTS } from './../../models/projects.model';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: false
})
export class NotFoundComponent {
  project = PROJECTS;
}
