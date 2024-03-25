import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/authServiсe/auth-service.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions'
import { Observable } from 'rxjs';
import { selectError } from 'src/app/store/auth/auth.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error$: Observable<string|null>
  loginForm!: FormGroup;
  
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store,
    private fb: FormBuilder
  ) {
    this.error$=this.store.pipe(select(selectError))
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: [ '' , Validators.required]
    })
  }
  onSubmit(form: FormGroup){
    this.store.dispatch(AuthActions.loginStart(form.value.email, form.value.password));
    this.authService.authChanged.subscribe((status) => {
      if (status) {
        this.router.navigate(['/courses']);
      }
    });
  }
}
