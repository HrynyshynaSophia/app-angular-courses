import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions'
import { selectUser } from 'src/app/store/auth/auth.selectors';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isAuth!: boolean;
  userLogin!: string;
  private user!: UserModel|null;
  user$!: Observable<UserModel| null>;
  constructor(
    private readonly store: Store,

  ) {}
  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user)=>{
      this.user = user;
      if (this.user) {
        this.userLogin = this.user.login;
        this.isAuth=true;
      }
    })
  }
  logout(): void {
    this.store.dispatch(AuthActions.logout())
  }
}
