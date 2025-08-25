import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

/**
 * Contact page component - Displays contact information and social media links
 * Features: SEO optimization and error handling
 */
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit {

    constructor(
        private seoService: SeoService,
        private errorHandler: ErrorHandlerService
    ) { }

    ngOnInit() {
        this.initializeSEO();
    }

    /**
     * Initialize SEO for the contact page
     */
    private initializeSEO(): void {
        try {
            this.seoService.updatePageSEO(
                'Contact - Alonso Jiménez | Get in Touch',
                'Get in touch with Alonso Jiménez, Frontend Developer. Connect via LinkedIn, GitHub, or email for web development projects and opportunities.',
                'contact developer, hire frontend developer, web development services, Angular developer contact'
            );

            this.seoService.updateCanonicalUrl('https://yourwebsite.com/contact');
        } catch (error) {
            this.errorHandler.handleError(error, 'Contact page SEO initialization');
        }
    }

    /**
     * Handle social media link clicks
     */
    onSocialLinkClick(platform: string): void {
        try {
            // Analytics tracking could be added here
            console.log(`User clicked on ${platform} link`);
        } catch (error) {
            this.errorHandler.handleError(error, `Social link click: ${platform}`);
        }
    }
}
