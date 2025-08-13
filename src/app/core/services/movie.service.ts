import { Injectable } from '@angular/core';
import { RequestToken } from '../../models';
import { apiKey, apiUrl } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}
  getPopularMovies(): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}discover/movie?sort_by=popularity.desc&${apiKey}`
    );
  }

  getInTheaterMovies(): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&${apiKey}`
    );
  }

  getKidsMovies(): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${apiKey}`
    );
  }

  getBestDramaMovies(): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}discover/movie?with_genres=18&primary_release_year=2019&${apiKey}`
    );
  }

  getMovieDetails(id: string | number): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}movie/${id}?${apiKey}`
    );
  }

  getSearchMovie(query: string): Observable<any> {
    return this.http.get<any>(
      `${apiUrl}search/movie?${apiKey}&query=${query}`
    );
  }
}
