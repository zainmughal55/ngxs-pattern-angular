import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';


import { User } from './user.model';

export interface IUserPayload {
  user_name: string;
  email: string;
}

@Injectable()
export class AppService {

  constructor(
    private afs: AngularFirestore,
  ) {

  }

  postUser(payload: IUserPayload): Observable<User> {
    return Observable
      .fromPromise(this.afs.collection<IUserPayload>('users')
        .add(payload));
  }

  postErrors(): Observable<any> {
    return Observable.throw({
      user_name:'wrong user name',
      email:'wrong email',
    });
  }

  fetchUsers(): Observable<User[]> {
    return this.afs.collection<IUserPayload>('users')
      .valueChanges()
      .pipe(map((users) => users.map((user) => new User(user))));
  }

  updateUser(payload: IUserPayload): Observable<User> {
    return Observable
      .fromPromise(this.afs.doc<User>('users').update(payload))
      .map(user => new User(user));
  }

  deleteUser(id: any): Observable<any> {
    return Observable
      .fromPromise(this.afs.doc<User>(id).delete());
  }

  loginUser(credential: any): Observable<any>{
    if(credential.email && credential.user_name){
      return Observable.of(true);
    } else {
      return Observable.of(false);
    }
  }
}