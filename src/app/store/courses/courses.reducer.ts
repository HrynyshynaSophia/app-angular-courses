import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions'
import { Course } from 'src/app/shared/models/course.model';
import { Author } from 'src/app/shared/models/author.model';
export interface State {
    courses: Course[],
    authors: Author[],
    selectedCourse: Course|null,
    loading: boolean;
    error: string|null;
}
const initialState: State = {
    courses: [],
    authors: [],
    selectedCourse: null,
    loading: false,
    error: null,
}
export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.getCourses, (state): State => ({ ...state, loading:true })),
    on(CoursesActions.getCoursesSuccess, (state,action): State => ({ ...state, loading:false, courses: action.courses, selectedCourse: null })),
    on(CoursesActions.coursesFailure, (state,action): State => ({ ...state, loading:false, error: action.error })),
    on(CoursesActions.addCourse, (state): State => ({ ...state, loading:true })),
    on(CoursesActions.addCourseSuccess, (state): State => ({ ...state, loading:false })),
    on(CoursesActions.editCourse, (state): State => ({ ...state, loading:true })),
    on(CoursesActions.editCourseSuccess, (state): State => ({ ...state, loading:false })),
    on(CoursesActions.deleteCourse, (state): State => ({ ...state, loading:true })),
    on(CoursesActions.deleteCourseSuccess, (state): State => ({ ...state, loading:false })),
    on(CoursesActions.selectCourseSuccess, (state,action): State => ({ ...state, loading:false, selectedCourse: action.course })),
    on(CoursesActions.getAuthors, (state): State => ({ ...state, loading:true})),
    on(CoursesActions.getAuthorsSuccess, (state,action): State => ({ ...state, loading:false, authors: action.authors })),
)