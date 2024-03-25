import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { CoursesPageComponent } from './courses/courses.component';
import { FooterComponent } from './core/footer/footer.component';
import { LogoComponent } from './shared/logo/logo.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { LoadMoreComponent } from './shared/load-more/load-more.component';
import { CourseCardComponent } from './courses/components/course-card/course-card.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './shared/pipes/durationpipe/duration.pipe';
import { BorderChangeDirective } from './shared/directives/border-change/border-change.directive';
import { IfAuthenticatedDirective } from './shared/directives/ifAuthenticated/if-authenticated.directive';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        CoursesPageComponent,
        FooterComponent,
        LogoComponent,
        SearchBarComponent,
        LoadMoreComponent,
        CourseCardComponent,
        DurationPipe,
        BorderChangeDirective,
        IfAuthenticatedDirective,
        LoginComponent,
      ],
      providers: [DurationPipe],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render the header', () => {
    const headerComponent = fixture.nativeElement.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('should render the breadcrumbs if user is authorized', () => {
    const breadcrumbsComponent =
      fixture.nativeElement.querySelector('app-breadcrumbs');
    const app = fixture.componentInstance;
    if (app.isAuth) {
      expect(breadcrumbsComponent).toBeTruthy();
    }
  });

  it('should render the courses if user is authorized', () => {
    const coursesComponent = fixture.nativeElement.querySelector('app-courses');
    const app = fixture.componentInstance;
    if (app.isAuth) {
      expect(coursesComponent).toBeTruthy();
    }
  });

  it('should render the footer', () => {
    const footerComponent = fixture.nativeElement.querySelector('app-footer');
    expect(footerComponent).toBeTruthy();
  });
});
