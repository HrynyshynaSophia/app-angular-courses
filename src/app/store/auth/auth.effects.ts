import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/shared/services/authServiсe/auth-service.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, catchError, exhaustMap, of } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
export interface AuthResponceData {
    token: string;
}
@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService,private router: Router) { }
    userInfo$ = createEffect(()=> { return this.actions$.pipe(
        ofType(AuthActions.GET_USER),
        exhaustMap(() => this.authService.getUserInfo()
            .pipe(
                map((user) => ({ type: AuthActions.GET_USER_SUCCESS, payload: user })),
                catchError((error)=>of(AuthActions.getUserFailure({error: error.message})))
            ))
    ) }
    )
    auth$ = createEffect(()=> { return this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        exhaustMap(({login, password}) => this.authService.login(login,password)
            .pipe(
                map((token) => {
                    console.log(token.token)
                    return ({ type: AuthActions.LOGIN_SUCCESS, token: token.token })
                }),
                catchError((error)=>of(AuthActions.loginFailure({error: error.message})))
            ))
    ) }
    )
    logout$=createEffect(()=> { 
        return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        exhaustMap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return of({ type: AuthActions.LOGOUT_SUCCESS });
        }
    ))}
    )
    
}