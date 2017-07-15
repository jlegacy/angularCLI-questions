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
    styles: [`
        input.radioPos{
                position: relative;
                top: 2px;
                left: 10px;
        }`
    ],
    templateUrl: 'takeTest.html'
})
export class TakeTestComponent implements OnInit {
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
    completed;


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
        this.grade = 0;
        this.completed = false;


    }


    getAnswers() {
        return <FormArray>this.signupForm.controls['answers'];
    }


    submitTest(formObject) {
        this.postLoading = true;
        this._httpService.post('/questions/postTest', formObject)
            .subscribe(x => {
                this.showResults(x);
            }, error => alert('error'))
    }

    showResults(data: ITestReturn) {
        this.postLoading = false;
        this.completed = true;
        let correctCount = 0;
        let errorCount = 0;

        //look at original determine how many correct//
        for (var x in data.questions) {

            var question = _.find(this.originalQuestions, function (e: ITest) {
                return e._id == data.questions[x].id
            });

            if (question) {
                var answer = _.find(question.answers, function (e) {
                    return e.correct === "true";
                });
            }

            if (data.questions[x].answer !== answer.answer) {
                errorCount += 1;
            }
            else {
                correctCount += 1;
            }

        }

        this.grade = (100/(errorCount + correctCount)) * correctCount;
    }

    submitQuestion() {
        var response;
        var control = this.getAnswers();
        var formObject: ITestAnswers;
        var pQuestion;

        this.currentQuestionIndex += 1;
        formObject = (this.signupForm.value);

        if (this.currentQuestionIndex > formObject.questions.length - 1) {
            this.submitTest(formObject);
        }


    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }


    setVariables(result) {
        this.postLoading = false;
        this.questions = result["questions"];
        this.originalQuestions = result["questions"];


        for (var x in this.questions) {
            this.addQuestion(this.questions[x].question, this.questions[x]._id);
        }
    }

    getTestQuestions() {
        this.postLoading = true;
        var questions = this._httpService.get('questions/questionsOnReport/');
        Observable
            .forkJoin(questions)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.setVariables(result), error => console.error(error));
    }

    ngOnInit() {
        this.header = "Add Question";
        this.questions = [{ question: "", _id: "", answers: [], ontest: "false" }];

        //  var id;

        this.route.params
            .subscribe(params => {
                this.id = +params["id"];
            });


        this.signupForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            questions: this.fb.array([]),
        })

        this.getTestQuestions();

        this.canRoute = false;

    }

    enterUserInfo() {

        this.userInfoEntered = true;
    }

    addQuestionForm(question, id) {
        return this.fb.group({
            question: [question],
            id: [id],
            answer: ['', Validators.required]
        });
    }

    addQuestion(question, id) {

        var control = this.getQuestions();
        control.push(this.addQuestionForm(question, id));
    }

    getQuestions() {
        console.log(<FormArray>this.signupForm.controls['questions']);
        return <FormArray>this.signupForm.controls['questions'];
    }
}
