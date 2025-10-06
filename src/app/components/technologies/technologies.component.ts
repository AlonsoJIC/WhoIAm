import { Component, OnInit } from '@angular/core';
import { FOTOS } from './../../models/fotos.model';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
  standalone: false
})
export class TechnologiesComponent implements OnInit {
  fotos = FOTOS;
  additionalIcons: string[] = [];

  constructor(private imageLoader: ImageLoaderService) { }

  ngOnInit() {
    // Cargar iconos adicionales
    this.additionalIcons = this.imageLoader.getImagesByCategory('icons');

    // Pre-cargar los iconos secundarios cuando se muestre el componente
    const secondaryIcons = this.imageLoader.getImagesByCategory('secondary');
    this.imageLoader.preloadImages(secondaryIcons).catch(error => {
      console.warn('Failed to preload secondary icons:', error);
    });
  }
}
