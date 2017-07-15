import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';
import { ModalModule } from "ng2-modal";

import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import { ControlMessages } from '../shared/messages.component';
import { ValidationService } from '../shared/validation.service';

import { ITest } from '../test/test.interface';
import { ITestAnswer } from '../test/test.interface';
import { ITestAnswers } from '../test/test.interface';
import { ITestReturn } from '../test/test.interface';

import * as _ from 'underscore';

interface IFilter {
    filter: "string"
}


@Component({
    providers: [HttpService],
    styles: [
        `
        .glyphicon-edit{
            color:green;
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
        `
    ],
    templateUrl: 'questions.html'

})
export class QuestionsComponent implements OnInit {
    generateTestForm: FormGroup;
    id;
    date;
    questionsList: ITest[];
    status;
    onText;
    offText;
    onColor;
    offColor;
    size;
    filter;
    onReport;
    searchInput;
    visible;
    postLoading;
    myTest;
    testInput;
    fb;

    constructor(fb: FormBuilder, private _httpService: HttpService, private router: Router) {
        this.fb = fb;
        this.status = false;
        this.onText = "on";
        this.offText = "off";
        this.onColor = "green";
        this.offColor = "red";
        this.size = "small";
        this.filter = "Show All";
        this.onReport = true;
        this.searchInput = "";
        this.visible;
        this.postLoading = false;
        this.myTest = false;
        this.testInput;
    }

    setVariables(result) {
        this.questionsList = result.questions;
        this.postLoading = false;
    }

    addQuestion(event) {
        this.router.navigate(['UpSertQuestion']);
    }

    editQuestion(id) {
        this.router.navigate(['UpSertQuestion', { id }]);
    }

    generateTest(data) {
        let dataList = [];
        let newArray = [];

        dataList = data.questions;

        let onTestList = dataList.filter(function (item) {
            return item.ontest === 'true';
        }).map(function (item) {
            return item._id;
        });

        let offTestList = dataList.filter(function (item) {
            return item.ontest === 'false';
        }).map(function (item) {
            return item._id;
        });

        if (onTestList.length < this.testInput) {
            newArray = [];
            let diff = this.testInput - onTestList.length
            for (let y = 0; y < diff; y++) {
                if (offTestList.length > 0) {
                    let randomStart = Math.floor(Math.random() * offTestList.length);
                    let rand = offTestList[randomStart];
                    newArray.push({ _id: rand });
                    offTestList.splice(randomStart, 1);
                }
                else {
                    break;
                }

            }
        }

        if (newArray.length > 0) {
            this.updateOnTest(newArray);
        }
        else
        {
            this.postLoading = false;
        }

    }

    processModal(modal) {

        this.postLoading = true;
        let questionsList = this._httpService.get('/questions');
        Observable
            .forkJoin(questionsList)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.generateTest(result), error => console.error(error));

        modal.close();
    }

    toggleOnTest(idx) {

        var elem = _.find(this.questionsList, function (e) {
            return e._id === idx;
        });

        if (elem.ontest === 'true') {
            elem.ontest = 'false';
        }
        else {
            elem.ontest = 'true';
        }

        this.putQuestion(elem);

    }

    refreshData() {

        if (this.filter === "Show All") {
            this.getQuestions();
        }
        if (this.filter === "On Report") {
            this.getQuestionsOnReport();
        }
    }

    updateOnTest(data) {
        this._httpService.post('/questions/upDateOnTest', data)
            .subscribe(x => {
                this.refreshData();
            }, error => this.router.navigate(['Error']))
    }

    putQuestion(elem) {
        this.postLoading = true;
        this._httpService.put('/questions/' + elem._id, elem)
            .subscribe(x => {
                this.refreshData();
            }, error => this.router.navigate(['Error']))
    }

    deleteQuestion(id) {
        var x = window.confirm('Do you really want to delete?');
        if (x === true) {
            this.postLoading = true;
            var questionDelete = this._httpService.delete('/questions/' + id);
            Observable
                .forkJoin(questionDelete)
                .subscribe(z => this.refreshData(), error => console.error(error));
        }
    }

    getQuestions() {
        this.postLoading = true;
        var questionsList = this._httpService.get('/questions');
        Observable
            .forkJoin(questionsList)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.setVariables(result), error => console.error(error));

    }

    getQuestionsOnReport() {
        this.postLoading = true;
        var questionsList = this._httpService.get('/questions/questionsOnReport', );
        Observable
            .forkJoin(questionsList)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.setVariables(result), error => console.error(error));
    }

    searchAllQuestions() {
        this.postLoading = true;
        var questionsList = this._httpService.post('/questions/searchQuestions', { input: this.searchInput });
        Observable
            .forkJoin(questionsList)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.setVariables(result), error => console.error(error));

    }

    ngOnInit() {
        this.getQuestions();
        this.generateTestForm = this.fb.group({
            testInput: ['', Validators.compose([Validators.required, ValidationService.inputValidator])],
        })
    }

    checkIf0(fieldControl: FormControl) {
        return fieldControl.value !== 0 ? null : { not0: true };
    }

    myFilterChange(evt: IFilter) {
        this.filter = evt.filter;

        if (evt.filter.toString() === "Show All") {
            this.getQuestions();
        }
        if (evt.filter.toString() === "On Report") {
            this.getQuestionsOnReport();
        }

    }

    searchQuestions() {
        this.searchAllQuestions();
    }

}
