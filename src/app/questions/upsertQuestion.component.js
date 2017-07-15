System.register(["@angular/core", "../shared/http.service", "@angular/router", "@angular/forms"], function (exports_1, context_1) {
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
    var core_1, http_service_1, router_1, forms_1, UpSertQuestionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            UpSertQuestionComponent = (function () {
                function UpSertQuestionComponent(fb, _httpService, router, route) {
                    this._httpService = _httpService;
                    this.router = router;
                    this.route = route;
                    this.fb = fb;
                    this.status = false;
                    this.onText = "on";
                    this.offText = "off";
                    this.onColor = "green";
                    this.offColor = "red";
                    this.size = "normal";
                    this.selectedAnswer = true;
                }
                UpSertQuestionComponent.prototype.editQuestion = function (id) {
                    var _this = this;
                    var response;
                    this._httpService.get('/questions/' + id)
                        .map(function (joined) { return new Object({ question: joined }); })
                        .subscribe(function (data) {
                        _this.question = data["question"][0];
                        for (var x in _this.question.answers) {
                            _this.addAnswer(_this.question.answers[x].answer, _this.question.answers[x].correct);
                        }
                    }, function (err) {
                        _this.router.navigate(['NotFound']);
                    });
                };
                UpSertQuestionComponent.prototype.setRadios = function (i) {
                    var controls = this.getAnswers();
                    var control;
                    control = controls.value;
                    var count = 0;
                    for (var x in control) {
                        if (i !== count)
                            control[count].correct = "false";
                        ++count;
                    }
                    this.selectedAnswer = true;
                };
                UpSertQuestionComponent.prototype.addBlankAnswer = function () {
                    var control = this.getAnswers();
                    control.push(this.initAnswer());
                };
                UpSertQuestionComponent.prototype.deleteAnswer = function (i) {
                    var control = this.getAnswers();
                    control.removeAt(i);
                };
                UpSertQuestionComponent.prototype.checkAnswerSelected = function () {
                    var controls = this.getAnswers();
                    var control;
                    control = controls.value;
                    for (var x in control) {
                        if (control[x].correct === "true")
                            return true;
                    }
                    return false;
                };
                UpSertQuestionComponent.prototype.submitQuestion = function () {
                    var _this = this;
                    var response;
                    var control = this.getAnswers();
                    var formObject;
                    var pQuestion;
                    this.selectedAnswer = this.checkAnswerSelected();
                    formObject = (this.signupForm.value);
                    formObject.ontest = this.question.ontest;
                    if (this.id) {
                        this._httpService.put('/questions/' + this.id, formObject)
                            .subscribe(function (x) {
                            _this.canRoute = true;
                            _this.router.navigate(['Questions']);
                        }, function (error) { return _this.router.navigate(['Error']); });
                    }
                    else {
                        this._httpService.post('/questions', formObject)
                            .subscribe(function (x) {
                            _this.canRoute = true;
                            _this.router.navigate(['Questions']);
                        }, function (error) { return _this.router.navigate(['Error']); });
                    }
                };
                UpSertQuestionComponent.prototype.trackByIndex = function (index, obj) {
                    return index;
                };
                UpSertQuestionComponent.prototype.switchOnTest = function () {
                    if (this.question.ontest === "false") {
                        this.question.ontest = "true";
                        return;
                    }
                    this.question.ontest = "false";
                };
                UpSertQuestionComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.header = "Add Question";
                    this.question = { question: "", answers: [], ontest: "false" };
                    //  var id;
                    this.route.params
                        .subscribe(function (params) {
                        _this.id = params["id"];
                    });
                    this.signupForm = this.fb.group({
                        question: ['', forms_1.Validators.compose([forms_1.Validators.required])],
                        ontest: [''],
                        answers: this.fb.array([])
                    });
                    if (this.id) {
                        this.editQuestion(this.id);
                        this.header = "Update Question";
                    }
                    this.canRoute = false;
                };
                UpSertQuestionComponent.prototype.initAnswer = function () {
                    return this.fb.group({
                        answer: ['', forms_1.Validators.required],
                        correct: "false"
                    });
                };
                UpSertQuestionComponent.prototype.addAnswerForm = function (answer, correct) {
                    return this.fb.group({
                        answer: [answer, forms_1.Validators.required],
                        correct: [correct]
                    });
                };
                UpSertQuestionComponent.prototype.addAnswer = function (answer, correct) {
                    var control = this.getAnswers();
                    control.push(this.addAnswerForm(answer, correct));
                };
                UpSertQuestionComponent.prototype.getAnswers = function () {
                    return this.signupForm.controls['answers'];
                };
                UpSertQuestionComponent = __decorate([
                    core_1.Component({
                        providers: [http_service_1.HttpService],
                        styles: ["\n        input.radioPos{\n                position: relative;\n                top: 2px;\n                left: 10px;\n        }"
                        ],
                        templateUrl: 'upsertQuestion.html'
                    }),
                    __metadata("design:paramtypes", [forms_1.FormBuilder, http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
                ], UpSertQuestionComponent);
                return UpSertQuestionComponent;
            }());
            exports_1("UpSertQuestionComponent", UpSertQuestionComponent);
        }
    };
});
//# sourceMappingURL=upsertQuestion.component.js.map