import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestToken } from '../../models';
import { apiKey, apiUrl } from '../../shared/constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  generationRequestToken(): Observable<RequestToken> {
     return this.http.get<RequestToken>(
      `${apiUrl}authentication/token/new?${apiKey}`
    );
  }

  deleteSession(sessionId: string | null): Observable<any> {
    return this.http.delete(
      `${apiUrl}authentication/session?${apiKey}`,
      { body: { session_id: sessionId } }
    );
  }

}
