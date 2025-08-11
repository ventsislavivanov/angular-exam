import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  links = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'favorite-movies', label: 'Favorites' },
    { path: 'about-us', label: 'About Us' },
    { path: 'contact-us', label: 'Contact Us' },
  ]

  private authService: AuthService = inject(AuthService);
  private router = inject(Router);

}
