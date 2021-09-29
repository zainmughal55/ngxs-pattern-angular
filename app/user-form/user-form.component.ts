import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { IFormFunctions, FormProperty } from '../prop/form.dec';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store, Actions } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import {User} from '../user.model';

import { SubmitFormAction, UserFormAsycnValidator } from './user-form.state'
import { LoginAction } from '../auth.state';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent extends FormGroup implements IFormFunctions, OnInit {

  initForm: (validatorService: any) => any;
  setFormValues: (any) => any;
  getFormValues: () => any;
  setFormErrors: (any) => any;
  clearFormErrors: () => any;
  setFormAsyncValidators: (validatorService: any) => any;

  @FormProperty('user_name')
  userName = new FormControl('', []);
  @FormProperty()
  email = new FormControl();

  @Output()
  onSubmit = new EventEmitter<any>();

  constructor(private store: Store) {
    super({});
    this.initForm(null);
  }

  ngOnInit() {
    console.log(this);
  }

  submit() {
    this.store.dispatch(new SubmitFormAction(new User(this.getFormValues())));
  }

  get formEvent(): { formValues: any, form: FormGroup } {
    return {
      formValues: this.getFormValues(),
      form: this,
    }
  }
  login(){
    this.store.dispatch(new LoginAction(this.getFormValues()));
  }

}