import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  projectId: number = 0;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      this.loadProject();
    });
  }

  loadProject(): void {
    this.project = this.projectService.getProjectById(this.projectId);
    if (this.project && this.project.images && this.project.images.length > 0) {
      this.selectedImage = this.project.images[0]; // Establecer la primera imagen como seleccionada inicialmente
    }
  }

  setSelectedImage(image: string): void {
    this.selectedImage = image;
  }
}
