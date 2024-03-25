import { createAction,props } from "@ngrx/store"; 
import { Author } from "src/app/shared/models/author.model";
import { Course } from "src/app/shared/models/course.model";
export const GET_COURSES='[Courses] Get Courses'
export const GET_COURSES_SUCCESS='[Courses] Get Courses Success'
export const COURSES_FAILURE='[Courses] Get Courses Failure'
export const ADD_COURSE = '[Courses] Add Course'
export const ADD_COURSE_SUCCESS = '[Courses] Add Course Success'
export const EDIT_COURSE = '[Courses] Add Course'
export const EDIT_COURSE_SUCCESS = '[Courses] Add Course Success'
export const DELETE_COURSE = '[Courses] Delete Course'
export const DELETE_COURSE_SUCCESS = '[Courses] Delete Course Success'
export const SELECT_COURSE = '[Courses] Select Course '
export const SELECT_COURSE_SUCCESS = '[Courses] Select Course Success'
export const GET_AUTHORS_SUCCESS = '[Courses] Get Authors Success '
export const GET_AUTHORS = '[Courses] Get Authors '

export enum ActionTypes {
    getCourses,
    getCoursesSuccess,
    coursesFailure,
    addCourse,
    addCourseSuccess,
    editCourse,
    editCourseSuccess,
    delteCourse,
    delteCourseSuccess,
    selectCourse,
    selectCourseSuccess,
    getAuthors,
    getAuthorsSuccess,
}
export const getCourses= createAction(
    GET_COURSES,
    props<{ start: number; count?: number; searchValue?: string }>()
)
export const getCoursesSuccess= createAction(
    GET_COURSES_SUCCESS,
    props<{ courses: Course[] }>()
)
export const coursesFailure= createAction(
    COURSES_FAILURE,
    props<{ error: string }>()
)
export const addCourse = createAction(
    ADD_COURSE,
    props<{course: Course}>()
)
export const addCourseSuccess = createAction(
    ADD_COURSE_SUCCESS
)
export const editCourse = createAction(
    EDIT_COURSE,
    props<{course: Course}>()
)
export const editCourseSuccess = createAction(
    EDIT_COURSE_SUCCESS
)
export const deleteCourse = createAction(
    DELETE_COURSE,
    props<{id: number}>()
)
export const deleteCourseSuccess = createAction(
    DELETE_COURSE_SUCCESS
)
export const selectCourse = createAction(
    SELECT_COURSE,
    props<{id: number}>()
)
export const selectCourseSuccess = createAction(
    SELECT_COURSE_SUCCESS,
    props<{course: Course}>()
)
export const getAuthors = createAction(
    GET_AUTHORS,
)
export const getAuthorsSuccess = createAction(
    GET_AUTHORS_SUCCESS,
    props<{authors: Author[]}>()
)
export type AuthActions= 
| ReturnType<typeof getCourses>
| ReturnType<typeof getCoursesSuccess>
| ReturnType<typeof coursesFailure>
| ReturnType<typeof addCourse>
| ReturnType<typeof addCourseSuccess>
| ReturnType<typeof editCourse>
| ReturnType<typeof editCourseSuccess>
| ReturnType<typeof deleteCourse>
| ReturnType<typeof deleteCourseSuccess>
| ReturnType<typeof selectCourse>
| ReturnType<typeof selectCourseSuccess>
| ReturnType<typeof getAuthors>
| ReturnType<typeof getAuthorsSuccess>


