import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MovieService } from '../../../core/services';
import { Movie } from '../../../models';
import { catchError, finalize, forkJoin, of, Subscription } from 'rxjs';
import { MovieCard, SearchJumbotron } from '../';

@Component({
  selector: 'app-dashboard',
  imports: [
    TitleCasePipe,
    MovieCard,
    SearchJumbotron,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  pageTitle: string = "Dashboard";
  searchTitle: string = 'Find the Perfect Movie for Any Mood!';
  searchDescription: string = 'Explore a world of movies at your fingertips. Search for your favorite titles or discover new ones to fall in love with. Start your journey today!';
  searchCallToAction: string = 'Looking for the perfect movie? Our platform makes it easy to search, discover, and save your favorite films. Join now and dive into the world of cinema.';
  $populateMovies = signal<Movie[]>([]);
  $inTheaterMovies =  signal<Movie[]>([]);
  $kidsMovies =  signal<Movie[]>([]);
  $bestDramaMovies =  signal<Movie[]>([]);

  $loading = signal<boolean>(true);

  private movieService: MovieService = inject(MovieService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const sub = forkJoin({
      popular: this.movieService.getPopularMovies().pipe(
        catchError(err => {
          console.error('Popular failed', err);
          return of({ results: [] });
        })
      ),
      inTheater: this.movieService.getInTheaterMovies().pipe(
        catchError(err => {
          console.error('InTheater failed', err);
          return of({ results: [] });
        })
      ),
      kids: this.movieService.getKidsMovies().pipe(
        catchError(err => {
          console.error('Kids failed', err);
          return of({ results: [] });
        })
      ),
      drama: this.movieService.getBestDramaMovies().pipe(
        catchError(err => {
          console.error('Drama failed', err);
          return of({ results: [] });
        })
      ),
    }).pipe(
      finalize(() => this.$loading.set(false))
    ).subscribe(({ popular, inTheater, kids, drama }) => {
      this.$populateMovies.set(popular.results.slice(0, 6));
      this.$inTheaterMovies.set(inTheater.results.slice(0, 6));
      this.$kidsMovies.set(kids.results.slice(0, 6));
      this.$bestDramaMovies.set(drama.results.slice(0, 6));
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
