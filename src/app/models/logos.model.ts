import { LOGO } from './logo.model'

export const LOGOS: LOGO[] = [
  {
    name: 'css',
    image: '/assets/cssL.svg',
    top: Math.random() * (600 - 50) + 100,
    left: 300,
    speedX: 0,
    speedY: Math.random() + 0.5,
  },
  {
    name: 'angular',
    image: '/assets/angularL.svg',
    top: Math.random() * (600 - 50) + 100,
    left: 100,
    speedX: 0,
    speedY: Math.random() + 0.5,
  },
  {
    name: 'js',
    image: '/assets/jsL.svg',
    top: Math.random() * (600 - 50) + 100,
    left: 0,
    speedX: 0,
    speedY: Math.random() + 0.5,
  },
  {
    name: 'git',
    image: '/assets/gitL.svg',
    top: Math.random() * (600 - 50) + 100,
    left: 200,
    speedX: 0,
    speedY: Math.random() + 0.5,
  },
]
