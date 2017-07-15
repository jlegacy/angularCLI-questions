import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../shared/http.service';
import {Observable} from 'rxjs/Observable';
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

interface IFilter {
    filter: "string"
}


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
    templateUrl: 'reviewTest.html'

})
export class ReviewTestComponent implements OnInit {

    postLoading = false;
    questionsList = [];
   
    constructor(private _httpService: HttpService, private router: Router) {}

    setVariables(result) {
        this.questionsList = result.questions;
        this.postLoading = false;
    }


    getTestQuestions() {
        this.postLoading = true;
        var questionsList = this._httpService.get('questions/questionsOnReport');
        Observable
            .forkJoin(questionsList)
            .map(joined => new Object({ questions: joined[0] }))
            .subscribe(result => this.setVariables(result), error => console.error(error));
    }
    ngOnInit() {
        this.getTestQuestions();
    }

 


}
