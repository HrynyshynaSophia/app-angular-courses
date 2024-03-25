import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadMoreComponent } from '../shared/load-more/load-more.component';
import { CoursesPageComponent } from './courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../shared/pipes/durationpipe/duration.pipe';
import { BorderChangeDirective } from '../shared/directives/border-change/border-change.directive';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        LoadMoreComponent,
        CourseCardComponent,
        SearchBarComponent,
        DurationPipe,
        BorderChangeDirective,
      ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
