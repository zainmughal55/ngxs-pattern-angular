import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { State, Action, Selector, Select } from '@ngxs/store';
import { Store, StateContext } from '@ngxs/store';
import { UpdateFormErrors } from '@ngxs/form-plugin';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { User } from '../user.model';
import { AppService } from '../app.service';
import { AddUserAction } from '../app.state';

export class SubmitFormAction {
  static readonly type = '[UserForm] Submit';
  constructor(public payload: User) { }
}

export class SubmitFormErrorAction {
  static readonly type = '[UserForm] Async Errors';
  constructor(public errors: any) { }
}

export interface IFormStateModel {
  model: any;
  dirty: boolean;
  status: string;
  errors: any;
  values: any;
  asyncValidator: (any) => any
}


@State<IFormStateModel | {}>({
  name: 'userForm',
  defaults: {},
})
export class UserFormState {

  constructor(
    public service: AppService,
  ) {

  }

  @Action(SubmitFormErrorAction)
  handleError(ctx: StateContext<IFormStateModel>, action: SubmitFormErrorAction): Observable<any> {
    return ctx.setState({
      ...ctx.getState(),
      errors: action.errors
    })
  }

  @Action(SubmitFormAction)
  submit(ctx: StateContext<IFormStateModel>, action: SubmitFormAction): Observable<any> {
    // return this.service.postUser(action.payload).pipe(
    //   catchError((errors, caught) => {
    //     ctx.dispatch(new SubmitFormErrorAction(errors));
    //     throw errors
    //   })
    // )
    return ctx.dispatch(new AddUserAction(action.payload));
  }
}


export class UserFormAsycnValidator {

  @Select(UserFormState)
  formSate$: Observable<IFormStateModel>;

  constructor() {
    this.formSate$.pipe(tap((resp) => {
      console.log(resp);
    }));
  }

  create() {
    return (key) => {
      return (control: AbstractControl) => {
        return this.formSate$.pipe(map((errors) => ({ serverError: errors[key] })));
      }
    }
  }

}