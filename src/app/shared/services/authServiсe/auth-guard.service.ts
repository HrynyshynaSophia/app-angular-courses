import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/auth/auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(): Observable<boolean> {
    this.store.select(selectIsAuth).subscribe();
    return this.store.select(selectIsAuth).pipe(
      map((isAuth) => {
        console.log('aaa')
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
