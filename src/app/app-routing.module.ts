import { NgModule } from '@angular/core';
import { CoursesPageComponent } from './courses/courses.component';
import { LoginComponent } from './login/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page/error-page.component';
import { AuthGuardService } from './shared/services/authServiсe/auth-guard.service';
import { CourseResolverService } from './shared/services/courseService/course-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesPageComponent },
  {
    path: 'courses/new',
    data: {breadcrumb: 'New Course'},
    loadChildren: () =>
      import('./add-edit-course/add-edit-course/add-edit-course.module').then(
        (m) => m.AddEditCourseModule
      ),
  },
  {
    path: 'courses/:id',
    resolve: {course: CourseResolverService},
    loadChildren: () =>
      import('./add-edit-course/add-edit-course/add-edit-course.module').then(
        (m) => m.AddEditCourseModule
      ),
  },

  { path: 'login', component: LoginComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {breadcrumb: 'Not found', message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
