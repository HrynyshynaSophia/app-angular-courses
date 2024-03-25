import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Course } from '../../models/course.model';
import { LoadingService } from '../loading-service/loading-service.service';

const sort = 'date';
const COURSES_URL = 'http://localhost:3004/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses!: Course[];
  wasSomethingChange = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingService
  ) {}
  getCoursesList(start: number, count?: number, searchValue?: string) {
    let searchParams = new HttpParams();
    if (searchValue) {
      searchParams = searchParams.append('textFragment', searchValue);
    }
    return this.http.get<Course[]>(
      COURSES_URL + `?start=${start}&count=${count}&sort=${sort}`,
      { params: searchParams }
    );
  }

  createCourse(course: Course) {
    return this.http.post(COURSES_URL, course);
  }

  getCourseById(id: number) {
    return this.http.get<Course>(COURSES_URL + `/${id}`);
  }
  updateCourse(course: Course) {
    this.loadingService.toggleLoading(true);
    this.wasSomethingChange.next(true);
    return this.http.patch(COURSES_URL + `/${course.id}`, course);
  }

  removeItem(id: number) {
    this.wasSomethingChange.next(true);
    return this.http.delete(COURSES_URL + `/${id}`);
  }
}
