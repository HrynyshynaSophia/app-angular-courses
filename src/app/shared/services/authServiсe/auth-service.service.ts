import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { LoadingService } from '../loading-service/loading-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'

const LOGIN_URL = 'http://localhost:3004/auth/login';
const GET_USER_URL = 'http://localhost:3004/auth/userInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_STORAGE_KEY = 'token';
  private authStatusChanged = new BehaviorSubject<boolean>(false);
  user: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);
  authChanged = this.authStatusChanged.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingService,
    private readonly store: Store
  ) { }

  login(login: string, password: string) {
    const userInfo = { login, password };
    return this.http.post<{ token: string }>(LOGIN_URL, userInfo).pipe(
      tap(
        (responce) => {
          if (responce) {
            localStorage.setItem(this.TOKEN_STORAGE_KEY, responce.token);
            this.authStatusChanged.next(true);
            this.store.dispatch(AuthActions.getUser())
          }
        })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((user) => !!user));
  }

  getUserInfo() {
    const token = { token: localStorage.getItem('token') }; return this.http.post<UserModel>(GET_USER_URL, token).pipe(
      tap(
        (responseData) => {
          this.user.next(responseData);
        },
        (error) => {
          this.loadingService.toggleLoading(false);
          console.error('Failed to get user info:', error);
        }
      )
    );
  }
}
