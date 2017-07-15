import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NavBarComponent } from './navBar.component';
import { DropDownQuestionFilterComponent } from './shared/dropDownQuestionFilter.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { PreventUnsavedChangesGuard } from './shared/preventUnsavedChangesGuard.service';

import { UpSertQuestionComponent } from './questions/upsertQuestion.component';
import { ReviewTestComponent } from './test/reviewTest.component';
import { TakeTestComponent } from './test/TakeTest.component';
import { ShowTestResultsComponent } from './test/ShowTestResults.component';
import { SpinnerComponent } from './shared/spinner.component';

import { ErrorComponent } from './error/error.component';
import { ResultsComponent } from './test/results.component';

import { PagingComponent } from './shared/paging.component';
import { APP_BASE_HREF } from '@angular/common';

import {ModalModule} from "ng2-modal";

import {ControlMessages} from './shared/messages.component';
import {ValidationService} from './shared/validation.service';


const appRoutes: Routes = [ 

  { path: 'Questions', component: QuestionsComponent },
  { path: 'UpSertQuestion', component: UpSertQuestionComponent },
  { path: 'UpSertQuestion/:_id', component: UpSertQuestionComponent },

  { path: '', component: QuestionsComponent },
  { path: 'ReviewTest', component: ReviewTestComponent },
  { path: 'Results', component: ResultsComponent },
  { path: 'Error', component: ErrorComponent },
  { path: 'TakeTest', component: TakeTestComponent },
  { path: 'ShowTestResults', component: ShowTestResultsComponent },
  { path: '**', component: QuestionsComponent },
  // { path: '/notFound', component: NotFoundComponent }

];

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, BsDropdownModule.forRoot(),ModalModule],
  declarations: [AppComponent, NavBarComponent,
    SpinnerComponent, PagingComponent, QuestionsComponent, UpSertQuestionComponent, SwitchComponent,
    DropDownQuestionFilterComponent, ReviewTestComponent, 
    TakeTestComponent, ErrorComponent, ResultsComponent, ShowTestResultsComponent,
    ControlMessages],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '',
    },
    PreventUnsavedChangesGuard,
    ValidationService
  ]
})
export class AppModule { }
