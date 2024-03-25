import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Course } from '../shared/models/course.model';
import { CourseService } from '../shared/services/courseService/course-service.service';
import { LoadingService } from '../shared/services/loading-service/loading-service.service';
import { Store, select } from '@ngrx/store';
import * as CoursesActions from '../store/courses/courses.actions';
import { selectCourses } from '../store/courses/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CourseService],
})
export class CoursesPageComponent implements OnInit {
  @Output() loadCoursesEvent = new EventEmitter<void>();
  courses!: Course[];
  filteredCourses: Course[] = [];
  isLoading = false;
  courses_start = 4;
  courses_count = 5;
  constructor(
    private readonly courseService: CourseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.getCourses({ start: 0, count: 5 }));
    this.store.pipe(select(selectCourses)).subscribe((courses) => {
      this.courses = courses;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        if (currentUrl === '/courses') {
          this.changeDetectorRef.markForCheck();
        }
      }
    });
  }

  trackByFn(index: number) {
    return index;
  }
  isCoursesEmpty(): boolean {
    return this.courses.length == 0;
  }
  onSearchCourse(searchName: string) {
    this.store.dispatch(
      CoursesActions.getCourses({
        start: 0,
        count: undefined,
        searchValue: searchName,
      })
    );
    this.store.pipe(select(selectCourses)).subscribe((filteredCourses) => {
      this.courses = filteredCourses;
    });
  }
  onAddCourse(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
    // this.breadcrumbService.buildBreadcrumbs(this.route.root, 'New Course')
  }
  onLoadCourses(): void {
    this.isLoading = true;
    this.courseService.getCoursesList(0, 5).subscribe((courses) => {
      this.isLoading = false;
      this.courses = courses;
      this.loadingService.toggleLoading(false);
    });
  }
  onLoadMore(): void {
    this.store.dispatch(
      CoursesActions.getCourses({
        start: this.courses_start,
        count: this.courses_count,
      })
    );
    this.store.pipe(select(selectCourses)).subscribe((courses) => {
      this.courses = this.courses.concat(courses);
    });
    this.courses_start += this.courses_count;
  }
}
