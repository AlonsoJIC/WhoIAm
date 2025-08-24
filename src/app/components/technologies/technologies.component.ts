import { Component } from '@angular/core';
import { FOTOS } from './../../models/fotos.model';


@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.scss'],
    standalone: false
})
export class TechnologiesComponent {
  fotos = FOTOS;

}
