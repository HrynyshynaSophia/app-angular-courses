import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../shared/models/course.model';
import { CourseService } from 'src/app/shared/services/courseService/course-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../../../store/courses/courses.actions';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  providers: [CourseService],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Output() loadCoursesEvent = new EventEmitter<void>();
  constructor(
    private readonly courseService: CourseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}
  ngOnInit(): void {
    this.courseService.wasSomethingChange.subscribe((isChanged) => {
      if (isChanged) {
        this.loadCoursesEvent.emit();
      }
    });
  }
  onDeleteCourse() {
    if (confirm('Are you really want to delete this course?')) {
      this.store.dispatch(CoursesActions.deleteCourse({ id: this.course.id }));
    }
  }
  onEdit() {
    this.router.navigate([this.course.id], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
