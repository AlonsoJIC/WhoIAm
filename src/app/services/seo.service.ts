import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEO_CONFIG } from '../config/seo.config';

/**
 * Service for managing SEO-related functionality including meta tags and page titles
 * Provides methods to update page metadata dynamically for better search engine optimization
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) { }

  /**
   * Updates the page title and meta description
   * @param title - The page title to set
   * @param description - The meta description to set
   * @param keywords - Optional keywords for the page
   */
  updatePageSEO(title: string, description: string, keywords?: string): void {
    // Update page title
    this.titleService.setTitle(title);

    // Update or add meta description
    this.meta.updateTag({ name: 'description', content: description });

    // Update or add keywords if provided
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });

    // Update Twitter Card tags
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  /**
   * Updates Open Graph image meta tag
   * @param imageUrl - The URL of the image to use for social sharing (can be relative or absolute)
   */
  updateOGImage(imageUrl: string): void {
    // If the URL is relative, make it absolute using the base URL
    const fullImageUrl = imageUrl.startsWith('http')
      ? imageUrl
      : `${SEO_CONFIG.baseUrl}${imageUrl}`;

    this.meta.updateTag({ property: 'og:image', content: fullImageUrl });
    this.meta.updateTag({ name: 'twitter:image', content: fullImageUrl });
  }

  /**
   * Updates the canonical URL for the current page
   * @param url - The canonical URL to set (can be relative or absolute)
   */
  updateCanonicalUrl(url: string): void {
    // If the URL is relative, make it absolute using the base URL
    const fullUrl = url.startsWith('http')
      ? url
      : `${SEO_CONFIG.baseUrl}${url}`;

    // Remove existing canonical link if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', fullUrl);
    document.head.appendChild(link);
  }

  /**
   * Sets structured data (JSON-LD) for better search engine understanding
   * @param structuredData - The structured data object to add to the page
   */
  setStructuredData(structuredData: any): void {
    // Remove existing structured data if present
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  /**
   * Generates and sets structured data for a person (developer portfolio)
   * Uses default configuration if no custom data provided
   */
  setPersonStructuredData(personData?: {
    name?: string;
    jobTitle?: string;
    url?: string;
    sameAs?: string[];
    description?: string;
  }): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personData?.name || SEO_CONFIG.author.name,
      "jobTitle": personData?.jobTitle || "Systems Engineer & Full Stack Developer",
      "url": personData?.url || SEO_CONFIG.author.website,
      "sameAs": personData?.sameAs || SEO_CONFIG.socialProfiles,
      "description": personData?.description || SEO_CONFIG.defaultDescription,
      "knowsAbout": [
        "Angular",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Bootstrap",
        "GSAP",
        "Web Development",
        "Full Stack Development"
      ]
    };

    this.setStructuredData(structuredData);
  }
}
