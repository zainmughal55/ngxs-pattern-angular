import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store, Select, Actions, ofAction } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { ILoginCredential } from './auth.state';

import {
  AddUserAction,
  UserState,
  LoadUserAction
} from './app.state';
import { User } from './user.model';

import { AppService } from './app.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @Select(state => state.users) users$: Observable<User[]>;
  @Select(state => state.auth) auth$: Observable<ILoginCredential>;

  constructor(
    private store: Store,
    private actions$: Actions) {
      this.auth$.subscribe((resp: ILoginCredential) => {
        console.log(resp);
      })
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserAction());
  }

}
