System.register(["@angular/core", "@angular/router", "../shared/http.service", "rxjs/Observable", "@angular/forms", "rxjs/add/operator/debounceTime", "rxjs/add/observable/range", "rxjs/add/observable/throw", "rxjs/add/operator/catch", "rxjs/add/observable/forkJoin", "rxjs/add/operator/retry", "rxjs/add/operator/timeout", "rxjs/add/operator/delay", "rxjs/add/operator/mergeMap", "rxjs/add/observable/interval", "rxjs/add/operator/map", "../shared/validation.service", "underscore"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, http_service_1, Observable_1, forms_1, validation_service_1, _, QuestionsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (_9) {
            },
            function (_10) {
            },
            function (_11) {
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (_12) {
                _ = _12;
            }
        ],
        execute: function () {
            QuestionsComponent = (function () {
                function QuestionsComponent(fb, _httpService, router) {
                    this._httpService = _httpService;
                    this.router = router;
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
                QuestionsComponent.prototype.setVariables = function (result) {
                    this.questionsList = result.questions;
                    this.postLoading = false;
                };
                QuestionsComponent.prototype.addQuestion = function (event) {
                    this.router.navigate(['UpSertQuestion']);
                };
                QuestionsComponent.prototype.editQuestion = function (id) {
                    this.router.navigate(['UpSertQuestion', { id: id }]);
                };
                QuestionsComponent.prototype.generateTest = function (data) {
                    var dataList = [];
                    var newArray = [];
                    dataList = data.questions;
                    var onTestList = dataList.filter(function (item) {
                        return item.ontest === 'true';
                    }).map(function (item) {
                        return item._id;
                    });
                    var offTestList = dataList.filter(function (item) {
                        return item.ontest === 'false';
                    }).map(function (item) {
                        return item._id;
                    });
                    if (onTestList.length < this.testInput) {
                        newArray = [];
                        var diff = this.testInput - onTestList.length;
                        for (var y = 0; y < diff; y++) {
                            if (offTestList.length > 0) {
                                var randomStart = Math.floor(Math.random() * offTestList.length);
                                var rand = offTestList[randomStart];
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
                    else {
                        this.postLoading = false;
                    }
                };
                QuestionsComponent.prototype.processModal = function (modal) {
                    var _this = this;
                    this.postLoading = true;
                    var questionsList = this._httpService.get('/questions');
                    Observable_1.Observable
                        .forkJoin(questionsList)
                        .map(function (joined) { return new Object({ questions: joined[0] }); })
                        .subscribe(function (result) { return _this.generateTest(result); }, function (error) { return console.error(error); });
                    modal.close();
                };
                QuestionsComponent.prototype.toggleOnTest = function (idx) {
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
                };
                QuestionsComponent.prototype.refreshData = function () {
                    if (this.filter === "Show All") {
                        this.getQuestions();
                    }
                    if (this.filter === "On Report") {
                        this.getQuestionsOnReport();
                    }
                };
                QuestionsComponent.prototype.updateOnTest = function (data) {
                    var _this = this;
                    this._httpService.post('/questions/upDateOnTest', data)
                        .subscribe(function (x) {
                        _this.refreshData();
                    }, function (error) { return _this.router.navigate(['Error']); });
                };
                QuestionsComponent.prototype.putQuestion = function (elem) {
                    var _this = this;
                    this.postLoading = true;
                    this._httpService.put('/questions/' + elem._id, elem)
                        .subscribe(function (x) {
                        _this.refreshData();
                    }, function (error) { return _this.router.navigate(['Error']); });
                };
                QuestionsComponent.prototype.deleteQuestion = function (id) {
                    var _this = this;
                    var x = window.confirm('Do you really want to delete?');
                    if (x === true) {
                        this.postLoading = true;
                        var questionDelete = this._httpService.delete('/questions/' + id);
                        Observable_1.Observable
                            .forkJoin(questionDelete)
                            .subscribe(function (z) { return _this.refreshData(); }, function (error) { return console.error(error); });
                    }
                };
                QuestionsComponent.prototype.getQuestions = function () {
                    var _this = this;
                    this.postLoading = true;
                    var questionsList = this._httpService.get('/questions');
                    Observable_1.Observable
                        .forkJoin(questionsList)
                        .map(function (joined) { return new Object({ questions: joined[0] }); })
                        .subscribe(function (result) { return _this.setVariables(result); }, function (error) { return console.error(error); });
                };
                QuestionsComponent.prototype.getQuestionsOnReport = function () {
                    var _this = this;
                    this.postLoading = true;
                    var questionsList = this._httpService.get('/questions/questionsOnReport');
                    Observable_1.Observable
                        .forkJoin(questionsList)
                        .map(function (joined) { return new Object({ questions: joined[0] }); })
                        .subscribe(function (result) { return _this.setVariables(result); }, function (error) { return console.error(error); });
                };
                QuestionsComponent.prototype.searchAllQuestions = function () {
                    var _this = this;
                    this.postLoading = true;
                    var questionsList = this._httpService.post('/questions/searchQuestions', { input: this.searchInput });
                    Observable_1.Observable
                        .forkJoin(questionsList)
                        .map(function (joined) { return new Object({ questions: joined[0] }); })
                        .subscribe(function (result) { return _this.setVariables(result); }, function (error) { return console.error(error); });
                };
                QuestionsComponent.prototype.ngOnInit = function () {
                    this.getQuestions();
                    this.generateTestForm = this.fb.group({
                        testInput: ['', forms_1.Validators.compose([forms_1.Validators.required, validation_service_1.ValidationService.inputValidator])],
                    });
                };
                QuestionsComponent.prototype.checkIf0 = function (fieldControl) {
                    return fieldControl.value !== 0 ? null : { not0: true };
                };
                QuestionsComponent.prototype.myFilterChange = function (evt) {
                    this.filter = evt.filter;
                    if (evt.filter.toString() === "Show All") {
                        this.getQuestions();
                    }
                    if (evt.filter.toString() === "On Report") {
                        this.getQuestionsOnReport();
                    }
                };
                QuestionsComponent.prototype.searchQuestions = function () {
                    this.searchAllQuestions();
                };
                QuestionsComponent = __decorate([
                    core_1.Component({
                        providers: [http_service_1.HttpService],
                        styles: [
                            "\n        .glyphicon-edit{\n            color:green;\n        }\n\n        .glyphicon-edit:hover{\n            cursor:pointer;\n            color:DarkSeaGreen;\n        }\n\n         .glyphicon-remove{\n            color:red;\n        }\n\n        .glyphicon-remove:hover{\n            cursor:pointer;\n            color:Crimson ;\n        }\n        "
                        ],
                        templateUrl: 'questions.html'
                    }),
                    __metadata("design:paramtypes", [forms_1.FormBuilder, http_service_1.HttpService, router_1.Router])
                ], QuestionsComponent);
                return QuestionsComponent;
            }());
            exports_1("QuestionsComponent", QuestionsComponent);
        }
    };
});
//# sourceMappingURL=questions.component.js.map