import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Course } from '../../models/course.model';
import { CourseService } from './course-service.service';
@Injectable({
    providedIn: 'root',
})
export class CourseResolverService implements Resolve<Course> {
    course!: Course;
    constructor(
        private courseService: CourseService,
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Course> {
        const id = route.params['id'];
        return this.courseService.getCourseById(id);
    }
}
