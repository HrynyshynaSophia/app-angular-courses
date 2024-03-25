import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CourseService } from './course-service.service';
import { Course } from '../../models/course.model';
const mockCourse: Course = {
  id: 1,
  name: 'title',
  description: 'description',
  isTopRated: false,
  date: '2023-09-28T04:39:24+00:00',
  authors: [
    {
      id: 1370,
      name: 'John',
    },
  ],
  length: 157,
};
describe('CourseService', () => {
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should get the list of courses', () => {
    const coursesResponse: Course[] = [
      {
        id: 8693,
        name: 'duis mollit reprehenderit ad',
        description:
          'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
        isTopRated: false,
        date: '2017-09-28T04:39:24+00:00',
        authors: [
          {
            id: 1370,
            name: 'Polly',
          },
        ],
        length: 157,
      },
      {
        id: 4980,
        name: 'magna excepteur aute deserunt',
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
        isTopRated: false,
        date: '2016-05-31T02:02:36+00:00',
        authors: [
          {
            id: 8413,
            name: 'Greta',
          },
        ],
        length: 207,
      },
    ];
    courseService.getCoursesList(0, 2).subscribe((courses) => {
      expect(courses).toEqual(coursesResponse);
    });
    const req = httpTestingController.expectOne(
      'http://localhost:3004/courses?start=0&count=2&sort=date'
    );
    expect(req.request.method).toBe('GET');
    req.flush(coursesResponse);
  });

  it('should create course'),
    () => {
      const newCourse: Course = mockCourse;
      courseService.createCourse(newCourse);
      const req = httpTestingController.expectOne(
        'http://localhost:3004/courses'
      );
      expect(req.request.method).toBe('POST');
      req.flush({});
      expect(courseService.wasSomethingChange.value).toBe(true);
    };
  it('should get a course by ID', () => {
    const courseId = 1;
    const courseResponse: Course = mockCourse;

    courseService.getCourseById(courseId).subscribe((course) => {
      expect(course).toEqual(courseResponse);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3004/courses/${courseId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(courseResponse);
  });
  it('should update a course', () => {
    const course: Course = mockCourse;

    courseService.updateCourse(course);

    const req = httpTestingController.expectOne(
      `http://localhost:3004/courses/${course.id}`
    );
    expect(req.request.method).toBe('PATCH');
    req.flush({});
    expect(courseService.wasSomethingChange.value).toBe(true);
  });
  it('should remove a course by id', () => {
    const courseId = 1;
    courseService.removeItem(courseId);
    const req = httpTestingController.expectOne(
      `http://localhost:3004/courses/${courseId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(courseService.wasSomethingChange.value).toBe(true);
  });
});
