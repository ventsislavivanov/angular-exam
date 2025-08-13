import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestToken } from '../../models';
import { apiKey, apiUrl } from '../../shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl = 'http://localhost:4200/approved';

  constructor(private http: HttpClient) {}

  generationRequestToken(): Observable<RequestToken> {
     return this.http.get<RequestToken>(
      `${apiUrl}authentication/token/new?${apiKey}`
    );
  }

  buildAuthUrl(requestToken: string): string {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(this.redirectUrl)}`;
  }

  // 3. Създаваме session_id след redirect
  createSession(requestToken: string): Observable<any> {
    return this.http.post<{ session_id: string }>(
      `${apiUrl}authentication/session/new?${apiKey}`,
      { request_token: requestToken }
    )
  }

  deleteSession(sessionId: string | null): Observable<any> {
    return this.http.delete(
      `${apiUrl}authentication/session?${apiKey}`,
      { body: { session_id: sessionId } }
    );
  }

  getToken(): string {
    return "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2U1MTM1NzA4NjlhNTJiNzI1NTRhNThjMGQ3OTI0OCIsIm5iZiI6MTczNjE1NDY4Mi40ODgsInN1YiI6IjY3N2I5ZTNhZDliMGU3MGQ1ZDcyNDcwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IEFrQNmFDvlOqsGtAAkguAd_xbXyQiZpB_59XUJMrvw";
  }
}
