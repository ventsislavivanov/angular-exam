import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MovieService } from '../../../core/services';
import { Movie } from '../../../models';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  pageTitle: string = "Dashboard";
  populateMovies: Movie[] = [];
  inTheaterMovies: Movie[] = [];
  kidsMovies: Movie[] = [];
  bestDramaMovies: Movie[] = [];

  private movieService: MovieService = inject(MovieService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const sub: Subscription = forkJoin({
      popular: this.movieService.getPopularMovies(),
      inTheater: this.movieService.getInTheaterMovies(),
      kids: this.movieService.getKidsMovies(),
      drama: this.movieService.getBestDramaMovies()
    }).subscribe({
      next: ({ popular, inTheater, kids, drama }: {
        popular: { results: Movie[] };
        inTheater: { results: Movie[] };
        kids: { results: Movie[] };
        drama: { results: Movie[] };
      }) => {
        this.populateMovies = popular.results.slice(0, 6);
        this.inTheaterMovies = inTheater.results.slice(0, 6);
        this.kidsMovies = kids.results.slice(0, 6);
        this.bestDramaMovies = drama.results.slice(0, 6);
      },
      error: (err) => {
        console.error('Failed to load dashboard data', err);
      }
    });

    this.subscriptions.add(sub);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
