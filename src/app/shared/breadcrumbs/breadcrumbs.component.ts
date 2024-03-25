import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from '../models/course.model';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import * as CoursesActions from '../../store/courses/courses.actions';
import { filter, startWith } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() isAuth!: boolean;
  breadcrumbs$!: Observable<string>;
  breadcrumbs: Array<{ label: string; path: string }> = [];
  courses: Course[] = [];
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(CoursesActions.getCourses({ start: 0 }));
    this.store.select(selectCourses).subscribe((courses) => {
      this.courses = courses;
      this.updateBreadcrumbs();
    });
    this.router.events
      .pipe(
        startWith({}),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  updateBreadcrumbs() {
    const url = this.router.routerState.snapshot.url;
    this.breadcrumbs.length = 0;
    const routerList = url.slice(1).split('/');
    if (routerList[0] === 'login') return;
    routerList.forEach((router, index) => {
      let label = '';
      let path = '';
      if (index === 0) {
        label = 'Courses';
        path = router;
      } else if (router === 'new') {
        label = '/ New';
      } else {
        const id = +router;
        const course: Course | undefined = this.courses.find(
          (course) => course.id === id
        );
        label = '/ ' + course?.name;
      }
      this.breadcrumbs.push({ label, path });
    });
    this.cdr.detectChanges();
  }
}
