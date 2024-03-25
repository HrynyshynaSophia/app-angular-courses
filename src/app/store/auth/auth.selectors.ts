import { createFeatureSelector, createSelector } from "@ngrx/store"
import { State } from "./auth.reducer";
export const selectAuthState = createFeatureSelector<State>('auth');
export const selectUser=createSelector(
    selectAuthState,
    (state: State)=>state.user
)
export const selectIsLoading= createSelector(
    selectAuthState,
    (state:State)=>state.loading
)
export const selectError= createSelector(
    selectAuthState,
    (state:State)=>state.error
)
export const selectIsAuth= createSelector(
    selectAuthState,
    (state:State)=>state.isAuth
)
