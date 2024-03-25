import { createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models/user.model';
import * as AuthActions from './auth.actions'
export interface State {
    user: UserModel| null;
    loading: boolean;
    token: string| null;
    error: string|null;
    isAuth: boolean;
}
const initialState: State = {
    user: null,
    loading: false,
    token: null,
    error:null,
    isAuth: false,
}
export const authReducer = createReducer(
    initialState,
    on(AuthActions.getUser, (state): State => ({ ...state, loading:true })),
    on(AuthActions.getUserSuccess, (state, action): State => ({ ...state, loading:false, user: action.payload, error:null, isAuth:true})),
    on(AuthActions.getUserFailure, (state, action): State => ({ ...state, loading:false, error: action.error})),
    on(AuthActions.loginStart, (state): State => ({ ...state, loading:true})),
    on(AuthActions.loginSuccess, (state, action): State => ( {...state, loading: false, token: action.token, error: null, isAuth: true})),
    on(AuthActions.loginFailure, (state,action): State => ({ ...state, loading:false, error: action.error,isAuth:false})),
    on(AuthActions.logout, (state): State => ({ ...state,loading: true})),
    on(AuthActions.logout, (state): State => ({ ...state, user:null, token: null, error: null,isAuth:false,loading: false})),

)