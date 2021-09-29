import { AbstractControl } from '@angular/forms';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { NgxsFormPlugin } from '@ngxs/form-plugin';

import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { AppService } from './app.service';

export class LoadUserAction {
  static readonly type = '[USER] Load';
}

export class AddUserAction {
  static readonly type = '[USER] Add';
  constructor(public payload: User) { }
}

export class DeleteUserAction {
  static readonly type = '[USER] Delete';
  constructor(public id: any) { }
}


// class AsyncValidator {
//   constructor(private service: Observable<any>) { }
//   get() {
//     return function (key) {
//       return function (control: AbstractControl) {
//         return this.service
//           .catch((errors: any) => {
//             return Observable.of({ serverError: errors[key] });
//           });
//       };
//     }
//   }

// }


@State<User[]>({
  name: 'users',
  defaults: [],
})
export class UserState {

  constructor(private service: AppService) { }

  @Action(LoadUserAction)
  loadUsers(ctx: StateContext<User[]>) {
    return this.service.fetchUsers()
      .pipe(
      tap((users: User[]) => {
        ctx.setState(users);
      }));
  }

  @Action(AddUserAction)
  addUser(ctx: StateContext<User[]>, action: AddUserAction) {
    const payload = action.payload.getModelValues();
    return this.service.postUser(payload);
  }

}
