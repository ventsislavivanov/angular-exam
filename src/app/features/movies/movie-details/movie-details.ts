import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsModel, Genre } from '../../../models';
import { MovieService } from '../../../core/services';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails implements OnInit {
  readonly BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
  readonly IMAGE_RESOLUTION = 'w500';

  private route:ActivatedRoute = inject(ActivatedRoute);
  private movieService: MovieService = inject(MovieService);

  $movie = signal<MovieDetailsModel | null>(null);
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieService.getMovieDetails(id).subscribe((movie: MovieDetailsModel) => {
          this.$movie.set(movie);
        });
      }
    });
  }

  get movieGender() {
    const movie: MovieDetailsModel | null = this.$movie();
    return movie?.genres?.map((g: Genre) => g?.name).join(', ') ?? '';
  }
}
