import { Component } from '@angular/core';
import { faGithub, faLinkedin, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faDiscord = faDiscord;
}
