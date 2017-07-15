System.register(["@angular/core", "@angular/router", "../shared/http.service", "rxjs/Observable", "rxjs/add/operator/debounceTime", "rxjs/add/observable/range", "rxjs/add/observable/throw", "rxjs/add/operator/catch", "rxjs/add/observable/forkJoin", "rxjs/add/operator/retry", "rxjs/add/operator/timeout", "rxjs/add/operator/delay", "rxjs/add/operator/mergeMap", "rxjs/add/observable/interval", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, router_1, http_service_1, Observable_1, ReviewTestComponent;
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
            }
        ],
        execute: function () {
            ReviewTestComponent = (function () {
                function ReviewTestComponent(_httpService, router) {
                    this._httpService = _httpService;
                    this.router = router;
                    this.postLoading = false;
                    this.questionsList = [];
                }
                ReviewTestComponent.prototype.setVariables = function (result) {
                    this.questionsList = result.questions;
                    this.postLoading = false;
                };
                ReviewTestComponent.prototype.getTestQuestions = function () {
                    var _this = this;
                    this.postLoading = true;
                    var questionsList = this._httpService.get('questions/questionsOnReport');
                    Observable_1.Observable
                        .forkJoin(questionsList)
                        .map(function (joined) { return new Object({ questions: joined[0] }); })
                        .subscribe(function (result) { return _this.setVariables(result); }, function (error) { return console.error(error); });
                };
                ReviewTestComponent.prototype.ngOnInit = function () {
                    this.getTestQuestions();
                };
                ReviewTestComponent = __decorate([
                    core_1.Component({
                        providers: [http_service_1.HttpService],
                        styles: [
                            "\n        .correct {\n            color: green;\n        }\n\n         .incorrect {\n            color: red;\n        }\n\n\n        .glyphicon-edit{\n            color:green;\n        }\n\n        .glyphicon-edit:hover{\n            cursor:pointer;\n            color:DarkSeaGreen;\n        }\n\n         .glyphicon-remove{\n            color:red;\n        }\n\n        .glyphicon-remove:hover{\n            cursor:pointer;\n            color:Crimson ;\n        }\n        "
                        ],
                        templateUrl: 'reviewTest.html'
                    }),
                    __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
                ], ReviewTestComponent);
                return ReviewTestComponent;
            }());
            exports_1("ReviewTestComponent", ReviewTestComponent);
        }
    };
});
//# sourceMappingURL=reviewTest.component.js.map