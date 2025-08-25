import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

/**
 * Project component - Displays all projects in a grid layout
 * Features: Project cards with images, descriptions, and navigation links
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: false
})
export class ProjectComponent implements OnInit {
  project: any[] = [];
  isLoading = true;
  hasError = false;
  errorMessage = '';

  constructor(
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  /**
   * Load all projects from the service
   */
  private loadProjects(): void {
    this.isLoading = true;
    this.hasError = false;

    this.projectService.getAllProducts().subscribe({
      next: (projects) => {
        this.project = projects;
        this.isLoading = false;

        if (projects.length === 0) {
          this.hasError = true;
          this.errorMessage = 'No projects found.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.errorHandler.handleError(error, 'Loading projects in component');
      }
    });
  }

  /**
   * Retry loading projects
   */
  retryLoadProjects(): void {
    this.loadProjects();
  }

  /**
   * Handle image loading errors
   */
  onImageError(event: any, project: any): void {
    this.errorHandler.handleImageError(event.target);
  }
}

