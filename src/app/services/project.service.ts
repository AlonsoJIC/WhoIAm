import { Injectable } from '@angular/core';
import { PROJECTS } from './../models/projects.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects = PROJECTS;

  constructor() { }

  getAllProducts(): any[] {
    return this.projects;     //OBTIENE TODOS LOS PROYECTOS PARA PODER HACER RENDERS O LISTAR
  }

  getProjectById(id: number) {
    return this.projects.find(projects => projects.id === id);  // OBTIENE PROYECTO POR ID PARA HACER RENDER DE PAGE O MAS COSAS
  }
}
