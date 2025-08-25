import { Injectable } from '@angular/core';
import { PROJECTS } from './../models/projects.model';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Service for managing project data and operations
 * Provides methods to retrieve project information with error handling
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects = PROJECTS;

  constructor(private errorHandler: ErrorHandlerService) { }

  /**
   * Retrieves all projects from the data source
   * @returns Observable<any[]> Array of all projects with error handling
   */
  getAllProducts(): Observable<any[]> {
    try {
      if (!this.projects || this.projects.length === 0) {
        console.warn('No projects found in data source');
        return of([]);
      }
      return of(this.projects);
    } catch (error) {
      this.errorHandler.handleError(error, 'Getting all projects');
      return of([]);
    }
  }

  /**
   * Retrieves a specific project by its ID
   * @param id - The unique identifier of the project
   * @returns Observable<any> The project object if found, null otherwise
   */
  getProjectById(id: number): Observable<any> {
    try {
      if (!id || id < 0) {
        console.warn('Invalid project ID provided:', id);
        return of(null);
      }

      const project = this.projects.find(projects => projects.id === id);

      if (!project) {
        console.warn(`Project with ID ${id} not found`);
        return of(null);
      }

      return of(project);
    } catch (error) {
      this.errorHandler.handleError(error, `Getting project by ID: ${id}`);
      return of(null);
    }
  }

  /**
   * Searches projects by title or technology
   * @param searchTerm - The term to search for in project titles and technologies
   * @returns Observable<any[]> Array of matching projects
   */
  searchProjects(searchTerm: string): Observable<any[]> {
    try {
      if (!searchTerm || searchTerm.trim().length === 0) {
        return this.getAllProducts();
      }

      const term = searchTerm.toLowerCase().trim();
      const filteredProjects = this.projects.filter(project =>
        project.title?.toLowerCase().includes(term) ||
        project.technologies?.toLowerCase().includes(term) ||
        project.description?.toLowerCase().includes(term)
      );

      return of(filteredProjects);
    } catch (error) {
      this.errorHandler.handleError(error, `Searching projects with term: ${searchTerm}`);
      return of([]);
    }
  }

  /**
   * Gets projects by technology stack
   * @param technology - The technology to filter by (e.g., 'ANGULAR', 'REACT')
   * @returns Observable<any[]> Array of projects using the specified technology
   */
  getProjectsByTechnology(technology: string): Observable<any[]> {
    try {
      if (!technology || technology.trim().length === 0) {
        return of([]);
      }

      const tech = technology.toUpperCase().trim();
      const filteredProjects = this.projects.filter(project =>
        project.technologies?.toUpperCase().includes(tech)
      );

      return of(filteredProjects);
    } catch (error) {
      this.errorHandler.handleError(error, `Getting projects by technology: ${technology}`);
      return of([]);
    }
  }

  /**
   * Validates if a project exists and has valid data
   * @param projectId - The ID of the project to validate
   * @returns Observable<boolean> True if project is valid, false otherwise
   */
  validateProject(projectId: number): Observable<boolean> {
    return this.getProjectById(projectId).pipe(
      map(project => {
        if (!project) return false;

        // Basic validation checks
        const hasTitle = project.title && project.title.trim().length > 0;
        const hasImage = project.image && project.image.trim().length > 0;
        const hasTechnologies = project.technologies && project.technologies.trim().length > 0;

        return hasTitle && hasImage && hasTechnologies;
      }),
      catchError(error => {
        this.errorHandler.handleError(error, `Validating project: ${projectId}`);
        return of(false);
      })
    );
  }

  /**
   * Gets the total number of projects
   * @returns number Total count of projects
   */
  getProjectCount(): number {
    try {
      return this.projects ? this.projects.length : 0;
    } catch (error) {
      this.errorHandler.handleError(error, 'Getting project count');
      return 0;
    }
  }

  /**
   * Gets featured projects (projects marked as featured or first N projects)
   * @param limit - Maximum number of featured projects to return (default: 6)
   * @returns Observable<any[]> Array of featured projects
   */
  getFeaturedProjects(limit: number = 6): Observable<any[]> {
    try {
      // For now, return first N projects as featured
      // In the future, you could add a 'featured' property to the project model
      const featuredProjects = this.projects.slice(0, Math.min(limit, this.projects.length));
      return of(featuredProjects);
    } catch (error) {
      this.errorHandler.handleError(error, `Getting featured projects with limit: ${limit}`);
      return of([]);
    }
  }
}
