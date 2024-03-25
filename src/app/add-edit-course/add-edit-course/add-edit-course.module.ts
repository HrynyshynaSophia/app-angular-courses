import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCourseRoutingModule } from './add-edit-course-routing.module';
import { AddEditCourseComponent } from './add-edit-course.component';
import { DurationComponent } from '../components/duration/duration/duration.component';
import { DateComponent } from '../components/date/date/date.component';
import { AuthorsComponent } from '../components/authors/authors/authors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AddEditCourseComponent,
    DurationComponent,
    DateComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddEditCourseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AsyncPipe
  ],
  providers: [
    DatePipe
  ]
})
export class AddEditCourseModule {}
