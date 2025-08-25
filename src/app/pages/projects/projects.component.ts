import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

/**
 * Projects page component - Container for displaying all projects
 * Features: SEO optimization and error handling
 */
@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent implements OnInit {

    constructor(
        private seoService: SeoService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {
        this.initializeSEO();
    }

    /**
     * Initialize SEO for the projects page
     */
    private initializeSEO(): void {
        try {
            this.seoService.updatePageSEO(
                'Projects - Alonso Jiménez | Frontend Developer Portfolio',
                'Explore my portfolio of web development projects including Angular applications, responsive websites, and modern web solutions. See my work with JavaScript, TypeScript, and various frameworks.',
                'web development projects, Angular projects, JavaScript, TypeScript, portfolio, responsive design, frontend development'
            );

            this.seoService.updateCanonicalUrl('https://yourwebsite.com/projects');
        } catch (error) {
            this.errorHandler.handleError(error, 'Projects page SEO initialization');
        }
    }
}
