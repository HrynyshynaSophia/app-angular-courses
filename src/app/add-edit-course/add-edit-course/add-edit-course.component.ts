import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Course } from 'src/app/shared/models/course.model';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../../store/courses/courses.actions';
import {
  selectAuthors,
  selectSelectedCourse,
} from 'src/app/store/courses/courses.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/shared/models/author.model';
import { AuthorsComponent } from '../components/authors/authors/authors.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
})
export class AddEditCourseComponent implements OnInit, AfterViewInit {
  @ViewChild(AuthorsComponent) authorsComponent!: AuthorsComponent;
  allAuthors: Author[] = [];

  courseForm!: FormGroup;
  private id!: number;
  allowEdit = false;
  course!: Course | undefined;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', Validators.required],
      duration: ['', [Validators.required]],
      authors: [[]],
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    const id = +this.route.snapshot.params['id'];
    this.id = id;
    if (id) {
      this.store.dispatch(CoursesActions.selectCourse({ id }));
    }
    this.store.dispatch(CoursesActions.getAuthors());
    this.store.select(selectAuthors).subscribe((authors) => {
      this.allAuthors = authors;
    });
    this.courseForm.get('authors')?.valueChanges.subscribe((value) => {
      this.authorsComponent.selectedAuthorsNames.push(value);
    });
  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.store.select(selectSelectedCourse).subscribe((course) => {
        if (course) {
          const formattedDate = this.datePipe.transform(
            course.date,
            'yyy-MM-dd'
          );
          this.course = course;
          this.courseForm.patchValue({
            title: course.name,
            description: course.description,
            date: formattedDate,
            duration: course.length,
          });
        }
      });
    }
  }
  get title() {
    return this.courseForm.get('title');
  }
  get description() {
    return this.courseForm.get('description');
  }
  get date() {
    return this.courseForm.get('date');
  }
  get duration() {
    return this.courseForm.get('duration');
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
  onAddCourse() {
    const matchedAuthors = [];
    for (const authorName of this.authorsComponent.selectedAuthorsNames) {
      const matchedAuthor = this.allAuthors.find(
        (author) => author.name === authorName
      );
      if (matchedAuthor) {
        matchedAuthors.push(matchedAuthor);
      }
    }
    const course: Course = {
      id: Date.now(),
      isTopRated: false,
      name: this.courseForm.get('title')?.value,
      description: this.courseForm.get('description')?.value,
      date: this.courseForm.get('date')?.value,
      authors: matchedAuthors,
      length: this.courseForm.get('duration')?.value,
    };
    this.store.dispatch(CoursesActions.addCourse({ course: course }));
  }
  onUpdateCourse() {
    const matchedAuthors = [];
    for (const authorName of this.authorsComponent.selectedAuthorsNames) {
      const matchedAuthor = this.allAuthors.find(
        (author) => author.name === authorName
      );
      if (matchedAuthor) {
        matchedAuthors.push(matchedAuthor);
      }
    }
    if (this.course) {
      const updatedCourse: Course = {
        id: this.course.id,
        isTopRated: this.course.isTopRated,
        name: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        date: this.courseForm.get('date')?.value,
        authors: matchedAuthors,
        length: this.courseForm.get('duration')?.value,
      };
      this.store.dispatch(CoursesActions.editCourse({ course: updatedCourse }));
    }
  }
  onSubmit() {
    if (this.course) {
      this.onUpdateCourse();
    } else {
      this.onAddCourse();
    }
    this.router.navigate(['courses']);
  }

  test() {
    return this.courseForm.invalid;
  }
}
