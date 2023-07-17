import { Component, OnInit } from '@angular/core';
import { LOGOS } from './../../models/logos.model';



@Component({
  selector: 'app-logo-animation',
  templateUrl: './logo-animation.component.html',
  styleUrls: ['./logo-animation.component.css']
})
export class LogoAnimationComponent implements OnInit{

  logos = LOGOS;

  constructor() { }

  ngOnInit(): void {
    this.createLogos();
    this.moveLogos();
  }

  createLogos(): void {
    // Crea varios logotipos con posiciones y velocidades aleatorias
    for (let i = 0; i < 5; i++) {
      const logo = {
        name: '',
        image: '',
        top: Math.random() * 1.5 + window.innerHeight,   // Posición vertical inicial aleatoria
        left: Math.random() * 1.5 + window.innerWidth,    // Posición horizontal inicial aleatoria
        speedX: Math.random() * 0.5 + 0.4,              // Velocidad horizontal aleatoria
        speedY: Math.random() * 0.5 + 0.4               // Velocidad vertical aleatoria
      };
      this.logos.push(logo);
    }
  }

  moveLogos(): void {
    setInterval(() => {
      // Mueve los logotipos y verifica los bordes de la pantalla
      for (let logo of this.logos) {
        logo.top += logo.speedY;
        logo.left += logo.speedX;

        if (logo.left+78 >= window.innerWidth || logo.left <= 0) {
          logo.speedX = -logo.speedX;  // Invierte la velocidad horizontal al llegar a los bordes
        }

        if (logo.top >= window.innerHeight || logo.top <= 0) {
          logo.speedY = -logo.speedY;  // Invierte la velocidad vertical al llegar a los bordes
        }
      }
    }, 10);  // Intervalo de tiempo ajustable para controlar la velocidad de movimiento
  }
}
