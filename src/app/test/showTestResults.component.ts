import { Component, OnInit } from '@angular/core';
import { Params, CanDeactivate } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from '../shared/customValidators.component';

import { ITest } from '../test/test.interface';
import { ITestAnswer } from '../test/test.interface';
import { ITestAnswers } from '../test/test.interface';
import { ITestReturn } from '../test/test.interface';

import * as _ from 'underscore';

@Component({
    providers: [HttpService],
    styles: [
        `
        .correct {
            color: green;
        }

         .incorrect {
            color: red;
        }


        .glyphicon-edit{
            color:red;
        }

        .glyphicon-edit:hover{
            cursor:pointer;
            color:DarkSeaGreen;
        }

         .glyphicon-remove{
            color:red;
        }

        .glyphicon-remove:hover{
            cursor:pointer;
            color:Crimson ;
        }

         input.radioPos{
                position: relative;
                top: 2px;
                left: 10px;
        }
        
        .hide{
            display:none;
        }
        `

    ],

    templateUrl: 'showTestResults.html'

})
export class ShowTestResultsComponent implements OnInit {
    signupForm: FormGroup;
    canRoute;
    questions: ITest[];
    fb;
    header;
    id;
    form: FormGroup;
    status;
    onText;
    offText;
    onColor;
    offColor;
    size;
    selectedAnswer;
    postLoading = false;
    currentQuestionIndex;
    userInfoEntered;
    originalQuestions;
    grade;
    date;
    completed;
    resultsList;
    answer;
    showDetails;
  
    constructor(fb: FormBuilder, private _httpService: HttpService, private router: Router, private route: ActivatedRoute) {
        this.fb = fb;
        this.status = false;
        this.onText = "on";
        this.offText = "off";
        this.onColor = "green";
        this.offColor = "red";
        this.size = "normal";
        this.selectedAnswer = true;
        this.currentQuestionIndex = -1;
        this.userInfoEntered = false;
        this.originalQuestions = [];
        this.grade = [];
        this.date = [];
        this.completed = false;
        this.resultsList = [];
        this.answer = [];
        this.showDetails = [];

    }

    expandDetails(id) {
        if (this.showDetails[id] === 'true') {
            this.showDetails[id] = 'false';
        }
        else {
            this.showDetails[id] = 'true';
        }
    } 

    showResults(data: ITestReturn[]) {
        this.postLoading = false;
        this.completed = true;

        for (var z in data) {
            let correctCount = 0;
            let errorCount = 0;

            //look at original determine how many correct//
            for (var x in data[z].questions) {

                var question = _.find(this.originalQuestions, function (e: ITest) {
                    return e._id == data[z].questions[x].id
                });

                if (question) {
                    var answer = _.find(question.answers, function (e) {
                        return e.correct === "true";
                    });
                }

                if (data[z].questions[x].answer !== answer.answer) {
                    errorCount += 1;
                    data[z].questions[x].correct = 'false';
                }
                else {
                    correctCount += 1;
                    data[z].questions[x].correct = 'true';
                }

            }


            this.grade[data[z]._id] = (100 / (errorCount + correctCount)) * correctCount;
            this.date[data[z]._id] = new Date(parseInt(data[z]._id.substring(0, 8), 16) * 1000);
            this.showDetails[data[z]._id] = 'false';
        }
        return data;
    }

    setVariables(result) {
        this.postLoading = false;
        this.originalQuestions = result["questions"];
        this.resultsList = this.showResults(result["results"]);
    }

    getTestResults() {
        this.postLoading = true;
        var testResults = this._httpService.get('questions/testResults/');
        var questions = this._httpService.get('/questions');
        Observable
            .forkJoin(testResults, questions)
            .map(joined => new Object({ results: joined[0], questions: joined[1] }, ))
            .subscribe(result => this.setVariables(result), error => console.error(error));
    }


    ngOnInit() {
        this.getTestResults();
    }





}
