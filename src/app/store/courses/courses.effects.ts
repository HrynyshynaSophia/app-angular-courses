import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/shared/services/authServiсe/auth-service.service";
import * as CoursesActions from './courses.actions';
import { CourseService } from "src/app/shared/services/courseService/course-service.service";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { Author } from "src/app/shared/models/author.model";
const AUTHORS_URL = 'http://localhost:3004/authors'
@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private authService: AuthService,
        private courseService: CourseService,
        private readonly store: Store,
        private readonly http: HttpClient,) { }
    courses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.GET_COURSES),
            exhaustMap((action) => {
                const { start, count, searchValue } = action;
                return this.courseService.getCoursesList(start, count, searchValue).pipe(
                    map((courses) => ({ type: CoursesActions.GET_COURSES_SUCCESS, courses: courses })),
                    catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                )
            }
            ))
    }
    )
    addCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.ADD_COURSE),
            exhaustMap(({ course }) => {
                return this.courseService.createCourse(course).pipe(
                    map(() => CoursesActions.addCourseSuccess()),
                    catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                )
            }
            ))
    }
    )
    editCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.EDIT_COURSE),
            exhaustMap(({ course }) => {
                return this.courseService.updateCourse(course).pipe(
                    map(() => CoursesActions.editCourseSuccess()),
                    catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                )
            }
            ))
    }
    )
    deleteCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.DELETE_COURSE),
            exhaustMap(({ id }) => {
                return this.courseService.removeItem(id).pipe(
                    map(() => {
                        this.store.dispatch(CoursesActions.getCourses({ start: 0, count: 5 }))
                        return CoursesActions.deleteCourseSuccess()
                    }),
                    catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                )
            }
            ))
    }
    )
    selectCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.SELECT_COURSE),
            exhaustMap(({ id }) => {
                return this.courseService.getCourseById(id).pipe(
                    map((course) => {
                        return ({ type: CoursesActions.SELECT_COURSE_SUCCESS, course: course })
                    },
                        catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                    )
                )
            }
            ))
    }
    )
    getAuthors$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoursesActions.GET_AUTHORS),
            switchMap(() => {
                return this.http.get<Author[]>(AUTHORS_URL)
                    .pipe(
                        map((authors) => CoursesActions.getAuthorsSuccess({authors}),
                            catchError((error) => of(CoursesActions.coursesFailure({ error: error.message })))
                        )
                    )
            }
            ))
    }
    )
} 
