import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

/**
 * Contact page component - Displays contact information and social media links
 * Features: SEO optimization, multiple contact methods (email, WhatsApp, social media)
 */
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit {

    // Contact information
    contactInfo = {
        email: 'alonsojic@example.com', // Actualiza con tu email real
        phone: '+1234567890', // Actualiza con tu número real
        whatsapp: '1234567890', // Actualiza con tu número de WhatsApp
        github: 'https://github.com/AlonsoJIC',
        linkedin: 'https://www.linkedin.com/in/alonsojic/',
        instagram: 'https://www.instagram.com/jalonsojic/'
    };

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
                'Get in touch with Alonso Jiménez, Systems Engineer & Full Stack Developer. Connect via email, WhatsApp, LinkedIn, GitHub, or Instagram for web development projects and opportunities.',
                'contact developer, hire full stack developer, web development services, Angular developer contact, email, whatsapp'
            );

            this.seoService.updateCanonicalUrl('https://yourwebsite.com/contact');
        } catch (error) {
            this.errorHandler.handleError(error, 'Contact page SEO initialization');
        }
    }
}
