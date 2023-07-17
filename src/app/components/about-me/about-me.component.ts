import { Component } from '@angular/core';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
}
