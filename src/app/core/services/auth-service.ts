import { inject, Injectable, signal } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { RequestToken } from '../../model/request-token.model';
// import { apiKey, apiUrl } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private http: HttpClient = inject(HttpClient);

  // generationRequestToken() {
  //   const params = new HttpParams().set('api_key', apiKey);
  //   return this.http.get<RequestToken>(
  //     `${apiUrl}/authentication/token/new`,
  //     { params }
  //   );
  // }
  //
  // createSession(requestToken: string) {
  //   const params = new HttpParams().set('api_key', apiKey);
  //   return this.http.post<{ success: boolean; session_id: string }>(
  //     `${apiUrl}/authentication/session/new`,
  //     { request_token: requestToken },
  //     { params }
  //   );
  // }
  //
  // deleteSession(sessionId: string) {
  //   const params = new HttpParams().set('api_key', apiKey);
  //   return this.http.delete<{ success: boolean }>(
  //     `${apiUrl}/authentication/session`,
  //     { body: { session_id: sessionId }, params }
  //   );
  // }

}
