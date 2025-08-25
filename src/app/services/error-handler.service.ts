import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Global error handling service
 * Provides centralized error handling, logging, and user-friendly error messages
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  /**
   * Handles and logs errors with appropriate user messages
   * @param error - The error object to handle
   * @param context - Optional context information about where the error occurred
   * @returns Observable with error result for chaining
   */
  handleError<T>(error: any, context?: string): Observable<T> {
    // Log error to console (in production, you might want to send to a logging service)
    this.logError(error, context);

    // Return user-friendly error message
    const userMessage = this.getUserFriendlyMessage(error, context);
    console.warn(`User message: ${userMessage}`);

    // Return empty result to let the app continue gracefully
    return of({} as T);
  }

  /**
   * Logs detailed error information
   * @param error - The error object
   * @param context - Optional context information
   */
  private logError(error: any, context?: string): void {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context: context || 'Unknown context',
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace available',
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    console.error('Error logged:', errorInfo);

    // In production, you could send this to a logging service
    // this.sendErrorToLoggingService(errorInfo);
  }

  /**
   * Returns user-friendly error messages based on error type
   * @param error - The error object
   * @param context - Optional context information
   * @returns User-friendly error message
   */
  private getUserFriendlyMessage(error: any, context?: string): string {
    // Network errors
    if (error?.status === 0 || error?.name === 'NetworkError') {
      return 'Connection problem. Please check your internet connection and try again.';
    }

    // HTTP errors
    if (error?.status) {
      switch (error.status) {
        case 404:
          return 'The requested resource was not found.';
        case 500:
          return 'Server error. Please try again later.';
        case 403:
          return 'Access denied. You don\'t have permission to access this resource.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }

    // Loading errors
    if (context?.includes('loading') || context?.includes('asset')) {
      return 'Some resources failed to load. The app will continue with limited functionality.';
    }

    // Animation errors
    if (context?.includes('animation') || context?.includes('gsap')) {
      return 'Animation error detected. Visual effects may be limited.';
    }

    // Font loading errors
    if (context?.includes('font')) {
      return 'Custom fonts failed to load. Default fonts will be used.';
    }

    // Image loading errors
    if (context?.includes('image')) {
      return 'Some images failed to load. Please check your connection.';
    }

    // Generic fallback
    return 'An unexpected error occurred. The application will continue with limited functionality.';
  }

  /**
   * Handles specific loading errors with retry logic
   * @param error - The loading error
   * @param retryFunction - Function to retry the failed operation
   * @param maxRetries - Maximum number of retry attempts (default: 3)
   * @returns Promise that resolves when retry is complete or fails
   */
  async handleLoadingError(
    error: any,
    retryFunction: () => Promise<any>,
    maxRetries: number = 3
  ): Promise<any> {
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        retryCount++;
        console.log(`Retry attempt ${retryCount}/${maxRetries}`);
        return await retryFunction();
      } catch (retryError) {
        if (retryCount === maxRetries) {
          this.logError(retryError, `Failed after ${maxRetries} retry attempts`);
          throw retryError;
        }
        // Wait before retrying (exponential backoff)
        await this.delay(1000 * Math.pow(2, retryCount));
      }
    }
  }

  /**
   * Creates a delay for retry logic
   * @param ms - Milliseconds to delay
   * @returns Promise that resolves after the delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Validates if a resource (image, font, etc.) is accessible
   * @param url - URL of the resource to validate
   * @returns Promise that resolves to true if accessible, false otherwise
   */
  async validateResource(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      this.logError(error, `Resource validation failed for: ${url}`);
      return false;
    }
  }

  /**
   * Gracefully handles image loading errors
   * @param imgElement - The image element that failed to load
   * @param fallbackSrc - Optional fallback image source
   */
  handleImageError(imgElement: HTMLImageElement, fallbackSrc?: string): void {
    this.logError(
      new Error(`Image failed to load: ${imgElement.src}`),
      'Image loading error'
    );

    if (fallbackSrc) {
      imgElement.src = fallbackSrc;
    } else {
      // Hide the image or replace with placeholder
      imgElement.style.display = 'none';

      // Optionally add a placeholder div
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = 'Image unavailable';
      placeholder.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        color: #666;
        font-size: 14px;
        min-height: 100px;
      `;

      imgElement.parentNode?.insertBefore(placeholder, imgElement);
    }
  }
}
