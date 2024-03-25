import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/shared/models/user.model";

export const LOGIN_START = '[Auth] Login Start ';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';

export const GET_USER = '[Auth] Get User'
export const GET_USER_SUCCESS = '[Auth] Get User Success'
export const GET_USER_FAILURE = '[Auth] Get User Failure'

export enum ActionTypes {
    loginStart,
    loginSuccess,
    getUser,
    getUserSuccess,
    getUserFailure,
    logout
}
export const loginStart = createAction(
    LOGIN_START,
    (login: string, password: string) => ({ login, password })
)
export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ token: string }>()
);
export const loginFailure = createAction(
    LOGIN_FAILURE,
    props<{ error: string }>()
);
export const getUser = createAction(
    GET_USER,
)
export const getUserSuccess = createAction(
    GET_USER_SUCCESS,
    props<{ payload: UserModel }>()
)
export const getUserFailure = createAction(
    GET_USER_FAILURE,
    props<{ error: string }>()
)
export const logout = createAction(
    LOGOUT,
)
export type AuthActions =
    | ReturnType<typeof loginStart>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFailure>
    | ReturnType<typeof getUser>
    | ReturnType<typeof getUserSuccess>
    | ReturnType<typeof getUserFailure>
    | ReturnType<typeof logout>



