import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

import { NgxsModule, Store, Action } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { AppComponent } from './app.component';
import { UserState } from './app.state';
import { UserFormState } from './user-form/user-form.state';
import { AppService } from './app.service';
import { UserFormComponent } from './user-form/user-form.component';

const config = {
  apiKey: "AIzaSyCqklstw10yrCHLIP4buKuiK9gIa1pOkXE",
  authDomain: "facebook-45692.firebaseapp.com",
  databaseURL: "https://facebook-45692.firebaseio.com",
  projectId: "facebook-45692",
  storageBucket: "facebook-45692.appspot.com",
  messagingSenderId: "1016561335708"
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    NgxsModule.forRoot([UserState, UserFormState]),
    NgxsFormPluginModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [AppComponent, UserFormComponent],
  bootstrap: [AppComponent],
  providers: [
    AppService,
    AngularFirestore
  ]
})
export class AppModule { }
