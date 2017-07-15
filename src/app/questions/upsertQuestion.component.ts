import { Component, OnInit } from '@angular/core';
import { Params, CanDeactivate } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { CustomValidators } from '../shared/customValidators.component';

import { IQuestion } from './question.interface';
import { IAnswer } from './question.interface';

@Component({
    providers: [HttpService],
    styles: [`
        input.radioPos{
                position: relative;
                top: 2px;
                left: 10px;
        }`
    ],
    templateUrl: 'upsertQuestion.html'

})
export class UpSertQuestionComponent implements OnInit {
    signupForm: FormGroup;
    canRoute;
    question: IQuestion;
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


    constructor(fb: FormBuilder, private _httpService: HttpService, private router: Router, private route: ActivatedRoute) {
        this.fb = fb;
        this.status = false;
        this.onText = "on";
        this.offText = "off";
        this.onColor = "green";
        this.offColor = "red";
        this.size = "normal";
        this.selectedAnswer = true;
    }


    editQuestion(id) {
        var response;
        this._httpService.get('/questions/' + id)
            .map(joined => new Object({ question: joined }))
            .subscribe(
            data => {
                this.question = data["question"][0];
                for (var x in this.question.answers) {
                    this.addAnswer(this.question.answers[x].answer, this.question.answers[x].correct);
                }
            },
            err => {
                this.router.navigate(['NotFound']);
            }
            )
    }

    setRadios(i) {
        var controls = this.getAnswers();
        var control: IAnswer[];
        control = controls.value;
        var count = 0;
        for (var x in control) {
            if (i !== count)
                control[count].correct = "false";
            ++count;
        }
        this.selectedAnswer = true;
    }

    addBlankAnswer() {
        var control = this.getAnswers();
        control.push(this.initAnswer());
    }



    deleteAnswer(i) {
        var control = this.getAnswers();
        control.removeAt(i);
    }



    checkAnswerSelected() {
        var controls = this.getAnswers();
        var control: IAnswer[];
        control = controls.value;
        for (var x in control) {
            if (control[x].correct === "true")
                return true;
        }
        return false;
    }

    submitQuestion() {
        var response;
        var control = this.getAnswers();
        var formObject: IQuestion;
        var pQuestion;

        this.selectedAnswer = this.checkAnswerSelected();

        formObject = (this.signupForm.value);
        formObject.ontest = this.question.ontest;

        if (this.id) {
            this._httpService.put('/questions/' + this.id, formObject)
                .subscribe(x => {
                    this.canRoute = true;
                    this.router.navigate(['Questions']);
                }, error => this.router.navigate(['Error']))
        }
        else {
            this._httpService.post('/questions', formObject)
                .subscribe(x => {
                    this.canRoute = true;
                    this.router.navigate(['Questions']);
                }, error => this.router.navigate(['Error']))
        }
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }


    switchOnTest() {
        if (this.question.ontest === "false") {
            this.question.ontest = "true";
            return;
        }

        this.question.ontest = "false";
    }

    ngOnInit() {
        this.header = "Add Question";
        this.question = { question: "", answers: [], ontest: "false" };

        //  var id;

        this.route.params
            .subscribe(params => {
                this.id = params["id"];
            });

        this.signupForm = this.fb.group({
            question: ['', Validators.compose([Validators.required])],
            ontest: [''],
            answers: this.fb.array([
            ])
        })

        if (this.id) {
            this.editQuestion(this.id);
            this.header = "Update Question"
        }

        this.canRoute = false;

    }

    initAnswer() {
        return this.fb.group({
            answer: ['', Validators.required],
            correct: "false"
        });
    }

    addAnswerForm(answer, correct) {
        return this.fb.group({
            answer: [answer, Validators.required],
            correct: [correct]
        });
    }

    addAnswer(answer, correct) {
        var control = this.getAnswers();
        control.push(this.addAnswerForm(answer, correct));
    }

    getAnswers() {
        return <FormArray>this.signupForm.controls['answers'];
    }



}