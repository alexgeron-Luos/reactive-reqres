import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credential } from '../model/credential';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<Credential>(null);

  user$: Observable<Credential> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<Credential> {
    const url = environment.apiUrl + 'login';
    return this.http.post<Credential>(url, { email, password }).pipe(
      tap((user) => {
        this.subject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
