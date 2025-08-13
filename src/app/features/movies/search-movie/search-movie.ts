import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../models';
import { MovieService } from '../../../core/services';
import {MovieCard} from '../movie-card/movie-card';

@Component({
  selector: 'app-search-movie',
  imports: [
    MovieCard
  ],
  templateUrl: './search-movie.html',
  styleUrl: './search-movie.css'
})
export class SearchMovie implements OnInit {
  private route:ActivatedRoute = inject(ActivatedRoute);
  private movieService: MovieService = inject(MovieService);

  $searchResults = signal<Movie[]>([]);
  query: string | null = null;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      if (this.query) {
        this.movieService.getSearchMovie(this.query).subscribe((movies) => {
          this.$searchResults.set(movies.results);
        });
      }
    });
  }
}
