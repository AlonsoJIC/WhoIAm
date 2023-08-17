import { Component, OnInit } from '@angular/core';
import { LOGOS } from './../../models/logos.model';

@Component({
  selector: 'app-logo-animation',
  templateUrl: './logo-animation.component.html',
  styleUrls: ['./logo-animation.component.css']
})
export class LogoAnimationComponent implements OnInit {

  logos = LOGOS;

  constructor() { }

  ngOnInit(): void {
    this.createLogos();
    this.moveLogos();
  }

  createLogos(): void {
    for (let i = 0; i < 5; i++) {
      const logo = {
        name: '',
        image: '',
        top: 0 * window.innerHeight,  // Posición vertical inicial aleatoria
        left: Math.random() * window.innerWidth,   // Posición horizontal inicial aleatoria
        speedX: Math.random() * 0.5 + 0.4,         // Velocidad horizontal aleatoria
        speedY: 0          // Velocidad vertical aleatoria
      };
      this.logos.push(logo);
    }
  }

  moveLogos(): void {
    setInterval(() => {
      for (let logo of this.logos) {
        logo.top += logo.speedY;
        logo.left += logo.speedX;

        if (logo.left + 79 >= window.innerWidth || logo.left <= 0) {
          logo.speedX = -logo.speedX;
        }

        if (logo.top >= window.innerHeight || logo.top <= 0) {
          logo.speedY = -logo.speedY;
        }
      }
    }, 10);
  }
}
