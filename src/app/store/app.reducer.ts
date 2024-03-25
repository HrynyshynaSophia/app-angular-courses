import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../store/auth/auth.reducer';
import * as fromCourses from '../store/courses/courses.reducer'

export interface AppState{
    auth: fromAuth.State;
    courses: fromCourses.State;
}
export const appReducer: ActionReducerMap<AppState>= {
    auth: fromAuth.authReducer,
    courses: fromCourses.coursesReducer,
}