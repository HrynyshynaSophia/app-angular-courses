import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './courses.reducer';
export const selectCoursesState = createFeatureSelector<State>('courses');
export const selectCourses = createSelector(
    selectCoursesState,
    (state: State) => state.courses
);
export const selectIsLoading = createSelector(
    selectCoursesState,
    (state: State) => state.loading
);
export const selectSelectedCourse = createSelector(
    selectCoursesState,
    (state: State) => state.selectedCourse
);
export const selectError = createSelector(
    selectCoursesState,
    (state: State) => state.error
);
export const selectAuthors = createSelector(
    selectCoursesState,
    (state: State) => state.authors
);
