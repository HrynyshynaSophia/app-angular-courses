import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from './services/courseService/course-service.service';
import { AuthService } from './services/authServiсe/auth-service.service';
import { BorderChangeDirective } from './directives/border-change/border-change.directive';
import { IfAuthenticatedDirective } from './directives/ifAuthenticated/if-authenticated.directive';
import { ErrorPageComponent } from './error-page/error-page/error-page.component';
import { LogoComponent } from './logo/logo.component';
import { DurationPipe } from './pipes/durationpipe/duration.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LoadingBlockComponent } from './loading-block/loading-block/loading-block.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BorderChangeDirective,
    ErrorPageComponent,
    LogoComponent,
    DurationPipe,
    SearchBarComponent,
    IfAuthenticatedDirective,
    BreadcrumbsComponent,
    LoadingBlockComponent,
  ],
  imports: [CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule],
  providers: [CourseService, AuthService, DurationPipe],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BorderChangeDirective,
    IfAuthenticatedDirective,
    ErrorPageComponent,
    LogoComponent,
    DurationPipe,
    SearchBarComponent,
    BreadcrumbsComponent,
    LoadingBlockComponent,
  ],
})
export class SharedModule {}
