import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { DurationPipe } from 'src/app/shared/pipes/durationpipe/duration.pipe';
import { AddEditCourseComponent } from './add-edit-course.component';
import { DateComponent } from '../components/date/date/date.component';
import { DurationComponent } from '../components/duration/duration/duration.component';

describe('AddEditCourseComponent', () => {
  let component: AddEditCourseComponent;
  let fixture: ComponentFixture<AddEditCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCourseComponent, DateComponent, DurationComponent,DurationPipe],
      imports: [FormsModule,RouterTestingModule,HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AddEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
