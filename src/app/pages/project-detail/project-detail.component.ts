import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

/**
 * Project Detail component - Displays detailed information about a specific project
 * Features: Image gallery, project information, navigation, and SEO optimization
 */
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  standalone: false
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  projectId: number = 0;
  selectedImage: string = '';
  isLoading = true;
  hasError = false;
  errorMessage = '';
  showModal = false;
  modalImage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private location: Location,
    private seoService: SeoService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = Number(id);
        if (this.projectId && !isNaN(this.projectId)) {
          this.loadProject();
        } else {
          this.handleInvalidId();
        }
      } else {
        this.handleInvalidId();
      }
    });
  }

  /**
   * Handle invalid project ID
   */
  private handleInvalidId(): void {
    this.hasError = true;
    this.errorMessage = 'Invalid project ID provided.';
    this.isLoading = false;
    this.errorHandler.handleError(
      new Error('Invalid project ID'),
      'Project detail component - invalid ID'
    );
  }

  /**
   * Load project data and initialize SEO
   */
  loadProject(): void {
    this.isLoading = true;
    this.hasError = false;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        if (project) {
          this.project = project;
          this.initializeImages();
          this.initializeSEO();
        } else {
          this.handleProjectNotFound();
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'Failed to load project details. Please try again later.';
        this.errorHandler.handleError(error, `Loading project ${this.projectId}`);
      }
    });
  }

  /**
   * Handle case when project is not found
   */
  private handleProjectNotFound(): void {
    this.hasError = true;
    this.errorMessage = 'Project not found.';
    this.errorHandler.handleError(
      new Error(`Project with ID ${this.projectId} not found`),
      'Project detail component - project not found'
    );
  }

  /**
   * Initialize project images
   */
  private initializeImages(): void {
    try {
      if (this.project && this.project.images && this.project.images.length > 0) {
        this.selectedImage = this.project.images[0];
      } else if (this.project && this.project.image) {
        this.selectedImage = this.project.image;
      }
    } catch (error) {
      this.errorHandler.handleError(error, 'Initializing project images');
    }
  }

  /**
   * Initialize SEO for the specific project
   */
  private initializeSEO(): void {
    try {
      if (this.project) {
        const title = `${this.project.title} - Alonso Jiménez Portfolio`;
        const description = this.project.description || this.project.simpleDescription || 'Project details';
        const keywords = `${this.project.technologies || ''}, web development, full stack, project`;

        this.seoService.updatePageSEO(title, description, keywords);
        this.seoService.updateCanonicalUrl(`https://yourwebsite.com/projects/${this.projectId}`);

        if (this.project.image) {
          this.seoService.updateOGImage(`https://yourwebsite.com/${this.project.image}`);
        }
      }
    } catch (error) {
      this.errorHandler.handleError(error, 'Project detail SEO initialization');
    }
  }

  /**
   * Set the selected image for the gallery
   */
  setSelectedImage(image: string): void {
    try {
      if (image && image.trim().length > 0) {
        this.selectedImage = image;
      }
    } catch (error) {
      this.errorHandler.handleError(error, 'Setting selected image');
    }
  }

  /**
   * Handle image loading errors
   */
  onImageError(event: any): void {
    this.errorHandler.handleImageError(event.target);
  }

  /**
   * Navigate back to previous page
   */
  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      // Fallback: navigate to projects page
      this.router.navigate(['/projects']);
    }
  }

  /**
   * Retry loading the project
   */
  retryLoad(): void {
    this.loadProject();
  }

  /**
   * Navigate to projects page
   */
  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  /**
   * Open image modal for full-size view
   */
  openImageModal(image: string): void {
    this.modalImage = image;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close image modal
   */
  closeImageModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
  }

  /**
   * Listen for ESC key to close modal
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showModal) {
      this.closeImageModal();
    }
  }
}
