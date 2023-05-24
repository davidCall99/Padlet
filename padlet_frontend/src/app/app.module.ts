import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {PadletsListComponent} from "./padlets-list/padlets-list.component";
import {PadletDetailComponent} from "./padlet-detail/padlet-detail.component";

import { MatDialogModule} from "@angular/material/dialog";
import { MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewPadletComponent } from './new-padlet/new-padlet.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { NewEntryComponent } from './new-entry/new-entry.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NewRatingComponent } from './new-rating/new-rating.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import {AuthInterceptor} from "./services/AuthInterceptor";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import { InviteComponent } from './invite/invite.component';
import { PadletDetailViewOnlyComponent } from './padlet-detail-view-only/padlet-detail-view-only.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PadletsListComponent,
    PadletDetailComponent,
    NewPadletComponent,
    NewEntryComponent,
    ConfirmDialogComponent,
    NewRatingComponent,
    NewCommentComponent,
    UpdateEntryComponent,
    InviteComponent,
    PadletDetailViewOnlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
