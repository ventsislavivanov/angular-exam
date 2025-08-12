import { Component, inject, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../models';
import { Store } from '@ngrx/store';
import { selectSuccess } from '../../../core/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


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

  faEye = faEye;
  faHeart = faHeart;

  get posterPath(): string {
    if (!this.movie) return '';
    return this.BASE_IMAGE_URL + this.IMAGE_RESOLUTION + this.movie.poster_path;
  }

  loginStatus$: Observable<boolean> = this.store.select(selectSuccess);

  addFavorite() {}

  viewDetails() {}
}
