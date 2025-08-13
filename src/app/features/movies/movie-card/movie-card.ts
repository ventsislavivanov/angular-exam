import {Component, inject, Input, Output} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../models';
import { Store } from '@ngrx/store';
import { selectSuccess } from '../../../core/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;

  BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  IMAGE_RESOLUTION = 'w500';

  private store: Store = inject(Store);
  private router = inject(Router);

  faEye = faEye;
  faHeart = faHeart;

  get posterPath(): string {
    if (!this.movie) return '';
    return this.BASE_IMAGE_URL + this.IMAGE_RESOLUTION + this.movie.poster_path;
  }

  loginStatus$: Observable<boolean> = this.store.select(selectSuccess);

  addFavorite(id: number) {
    console.log(id);
    // this.router.navigate()
  }

  viewDetails(id: number) {
    this.router.navigate(['/movie/details', id]);
  }
}
