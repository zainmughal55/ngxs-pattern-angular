import { AbstractControl } from '@angular/forms';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { NgxsFormPlugin } from '@ngxs/form-plugin';
import { AppService } from './app.service';

import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
export interface ILoginCredential{
  email: string;
  user_name: string;
  token?: string;
  authenticated: boolean;
}
export interface ISignUpCredential{
  email: string;
  user_name: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}
export class LoginAction {
  static readonly type = "[AUTH] Login";
  constructor (public payload: ILoginCredential){}
}
export class LogoutAction {
  static readonly type = "[AUTH] Logout";
}
export class SignUpAction {
  static readonly type = "[AUTH] SignUp";
  constructor (public payload: ISignUpCredential){}
}

@State<ILoginCredential | {}>({
  name:'auth',
  defaults: {},
})
export class AuthState{
  constructor(private service: AppService){}

  @Action(LoginAction)
  login(ctx: StateContext<ILoginCredential>, action: LoginAction){
    return this.service.loginUser(action.payload).pipe( tap((resp: boolean)=>{
      ctx.setState({email:"zain@gmail.com",user_name:"zain",token:"ASDWRWs@#saD@31@SD123",authenticated:resp});
    }))
  }
}
