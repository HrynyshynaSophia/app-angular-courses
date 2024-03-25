import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCourseComponent } from './add-edit-course.component';
import { AuthGuardService } from 'src/app/shared/services/authServiсe/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: AddEditCourseComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', component: AddEditCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditCourseRoutingModule {}
