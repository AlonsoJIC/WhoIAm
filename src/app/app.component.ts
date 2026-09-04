import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { SeoService } from './services/seo.service';
import { SEO_CONFIG } from './config/seo.config';
import { PROJECTS } from './models/projects.model';

/**
 * Root component of the application
 * Handles initial loading, error management, and SEO setup
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Portafolio';
  isLoading = true;
  loadingProgress = 0;
  loadingText = 'Initializing...';
  hasLoadingError = false;
  loadingErrorMessage = '';

  private totalAssets = 0;
  private loadedAssets = 0;
  private maxRetryAttempts = 3;
  private currentRetryAttempt = 0;

  constructor(
    private errorHandler: ErrorHandlerService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.initializeSEO();
    this.startRealLoading();
  }

  /**
   * Initialize SEO meta tags and structured data
   */
  private initializeSEO(): void {
    try {
      // Set main page SEO using configuration
      this.seoService.updatePageSEO(
        SEO_CONFIG.defaultTitle,
        SEO_CONFIG.defaultDescription,
        SEO_CONFIG.defaultKeywords
      );

      // Set structured data for developer profile (uses default config)
      this.seoService.setPersonStructuredData();
    } catch (error) {
      this.errorHandler.handleError(error, 'SEO initialization');
    }
  }

  /**
   * Start the loading process with error handling and retry logic
   */
  private async startRealLoading() {
    try {
      this.updateLoadingStatus('Loading fonts...', 10);
      await this.loadFontsWithRetry();

      this.updateLoadingStatus('Loading images...', 30);
      await this.loadImagesWithRetry();

      this.updateLoadingStatus('Initializing components...', 70);
      await this.initializeComponents();

      this.updateLoadingStatus('Almost ready...', 90);
      this.updateLoadingStatus('Ready!', 100);

      this.isLoading = false;
      this.hasLoadingError = false;
    } catch (error) {
      await this.handleLoadingError(error);
    }
  }

  /**
   * Handle loading errors with retry logic and graceful fallback
   */
  private async handleLoadingError(error: any): Promise<void> {
    this.currentRetryAttempt++;

    if (this.currentRetryAttempt <= this.maxRetryAttempts) {
      this.updateLoadingStatus(`Retrying... (${this.currentRetryAttempt}/${this.maxRetryAttempts})`, 50);
      this.errorHandler.handleError(error, `Loading attempt ${this.currentRetryAttempt}`);

      // Wait before retrying
      await this.delay(2000);

      // Retry the loading process
      return this.startRealLoading();
    } else {
      // All retries exhausted, show content with error message
      this.hasLoadingError = true;
      this.loadingErrorMessage = 'Some resources failed to load, but the application is ready to use.';
      this.errorHandler.handleError(error, 'Loading failed after all retry attempts');

      this.updateLoadingStatus('Loading with limited functionality...', 100);
      await this.delay(2000);
      this.isLoading = false;
    }
  }

  /**
   * Update loading status with progress and text
   */
  private updateLoadingStatus(text: string, progress: number): void {
    this.loadingText = text;
    this.loadingProgress = progress;
  }

  /**
   * Load fonts with retry logic and error handling
   */
  private async loadFontsWithRetry(): Promise<void> {
    try {
      return await this.errorHandler.handleLoadingError(
        null,
        () => this.loadFonts(),
        2
      );
    } catch (error) {
      this.errorHandler.handleError(error, 'Font loading');
      // Continue without fonts if they fail to load
    }
  }

  /**
   * Load images with retry logic and error handling
   */
  private async loadImagesWithRetry(): Promise<void> {
    try {
      return await this.errorHandler.handleLoadingError(
        null,
        () => this.loadImages(),
        2
      );
    } catch (error) {
      this.errorHandler.handleError(error, 'Image loading');
      // Continue without some images if they fail to load
    }
  }

  /**
   * Load fonts with fallback support
   */
  private loadFonts(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ('fonts' in document) {
        // Set a timeout to prevent hanging
        const timeout = setTimeout(() => {
          reject(new Error('Font loading timeout'));
        }, 5000);

        document.fonts.ready.then(() => {
          clearTimeout(timeout);
          resolve();
        }).catch((error) => {
          clearTimeout(timeout);
          reject(error);
        });
      } else {
        // Continue immediately in browsers without the Font Loading API.
        resolve();
      }
    });
  }

  /**
   * Load images with error handling and progress tracking
   */
  private loadImages(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Imágenes críticas - Carga inmediata
      const criticalImages = [
        'assets/1.webp',
        'assets/nombre.webp',
        'assets/bg1.webp',
        'assets/avatar.svg'
      ];

      // Imágenes de tecnologías principales - Carga secundaria (prioridad alta)
      const secondaryImages = [
        'assets/html.svg',
        'assets/css.svg',
        'assets/js.svg',
        'assets/ts.svg',
        'assets/angular.svg',
        'assets/react.svg',
        'assets/node.svg',
        'assets/git.svg',
        'assets/bootstrap.svg',
        'assets/sass.svg',
        'assets/astro.svg',
        'assets/spring.svg',
        'assets/laravel.svg',
        'assets/flask.svg',
        'assets/csharp.svg',
        'assets/java.svg',
        'assets/python.svg',
        'assets/rust.svg',
        'assets/scrum.svg',
        'assets/atlassian.svg',
        'assets/tailwind.svg',
        'assets/pug.svg',
        'assets/gsap.svg',
        'assets/firebase.svg',
        'assets/databases.svg',
        'assets/oracle.svg',
        'assets/docker.svg',
        'assets/postman.svg',
        'assets/insomnia.svg',
        'assets/jwt.svg',
        'assets/shopify.svg',
        'assets/wordpress.svg',
        'assets/adobexd.svg',
        'assets/figma.svg',
        'assets/gwd.svg',
        'assets/aws.svg'
      ];

      // Iconos adicionales y variaciones - Lazy loading (carga después)
      const additionalIcons = [
        'assets/nodeL.svg',
        'assets/gitL.svg',
        'assets/htmlL.svg',
        'assets/jsL.svg',
        'assets/angularL.svg',
        'assets/heart.svg'
      ];

      // Only critical home assets block the first render. Other images load on demand.
      const imagesToLoad = criticalImages;

      // Registrar todas las imágenes en el ImageLoaderService
      const allImages = {
        critical: criticalImages,
        secondary: secondaryImages,
        projects: PROJECTS.flatMap(project => [project.image, ...(project.images || [])]),
        icons: additionalIcons
      };

      // Guardar las rutas de las imágenes para que estén disponibles para lazy loading
      try {
        localStorage.setItem('portfolioImages', JSON.stringify(allImages));
      } catch (error) {
        console.warn('Failed to cache image paths:', error);
      }

      this.totalAssets = imagesToLoad.length;
      this.loadedAssets = 0;
      let failedAssets = 0;
      const maxAllowedFailures = Math.floor(imagesToLoad.length * 0.3); // Allow 30% failure rate

      if (imagesToLoad.length === 0) {
        resolve();
        return;
      }

      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        if (this.loadedAssets + failedAssets < this.totalAssets) {
          console.warn('Image loading timeout - continuing with loaded images');
          resolve();
        }
      }, 30000); // 30 second timeout

      imagesToLoad.forEach((src, index) => {
        const img = new Image();

        img.onload = () => {
          this.loadedAssets++;
          const progress = 30 + ((this.loadedAssets + failedAssets) / this.totalAssets) * 40; // 30-70%
          this.updateLoadingStatus(`Loading images... (${this.loadedAssets}/${this.totalAssets})`, progress);

          if (this.loadedAssets + failedAssets === this.totalAssets) {
            clearTimeout(timeout);
            if (failedAssets > maxAllowedFailures) {
              reject(new Error(`Too many image loading failures: ${failedAssets}/${this.totalAssets}`));
            } else {
              resolve();
            }
          }
        };

        img.onerror = () => {
          failedAssets++;
          this.errorHandler.handleError(
            new Error(`Failed to load image: ${src}`),
            'Image loading'
          );

          const progress = 30 + ((this.loadedAssets + failedAssets) / this.totalAssets) * 40; // 30-70%
          this.updateLoadingStatus(`Loading images... (${this.loadedAssets}/${this.totalAssets})`, progress);

          if (this.loadedAssets + failedAssets === this.totalAssets) {
            clearTimeout(timeout);
            if (failedAssets > maxAllowedFailures) {
              reject(new Error(`Too many image loading failures: ${failedAssets}/${this.totalAssets}`));
            } else {
              resolve();
            }
          }
        };

        img.src = src;
      });
    });
  }

  /**
   * Initialize components with error handling
   */
  private initializeComponents(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create a delay promise
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
