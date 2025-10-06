import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {
  private loadedImages = new Set<string>();
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  private imageCategories: { [key: string]: string[] } = {};

  constructor() {
    this.initializeImageCategories();
  }

  private initializeImageCategories() {
    try {
      const savedImages = localStorage.getItem('portfolioImages');
      if (savedImages) {
        this.imageCategories = JSON.parse(savedImages);
      }
    } catch (error) {
      console.warn('Failed to load image categories:', error);
    }
  }

  getImagesByCategory(category: 'critical' | 'secondary' | 'projects' | 'icons'): string[] {
    return this.imageCategories[category] || [];
  }

  async preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src)) {
      return;
    }

    this.loading.next(true);

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.loadedImages.add(src);
        this.loading.next(false);
        resolve();
      };

      img.onerror = () => {
        this.loading.next(false);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  async preloadImages(sources: string[]): Promise<void> {
    this.loading.next(true);

    try {
      await Promise.all(
        sources.map(src => this.preloadImage(src))
      );
    } finally {
      this.loading.next(false);
    }
  }

  isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }
}