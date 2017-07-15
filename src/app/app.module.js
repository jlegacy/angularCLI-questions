System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "@angular/http", "./app.component", "angular2-bootstrap-switch/components", "ngx-bootstrap", "./navBar.component", "./shared/dropDownQuestionFilter.component", "@angular/router", "./questions/questions.component", "./shared/preventUnsavedChangesGuard.service", "./questions/upsertQuestion.component", "./test/reviewTest.component", "./test/TakeTest.component", "./test/ShowTestResults.component", "./shared/spinner.component", "./error/error.component", "./test/results.component", "./shared/paging.component", "@angular/common", "ng2-modal", "./shared/messages.component", "./shared/validation.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, forms_1, http_1, app_component_1, components_1, ngx_bootstrap_1, navBar_component_1, dropDownQuestionFilter_component_1, router_1, questions_component_1, preventUnsavedChangesGuard_service_1, upsertQuestion_component_1, reviewTest_component_1, TakeTest_component_1, ShowTestResults_component_1, spinner_component_1, error_component_1, results_component_1, paging_component_1, common_1, ng2_modal_1, messages_component_1, validation_service_1, appRoutes, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (components_1_1) {
                components_1 = components_1_1;
            },
            function (ngx_bootstrap_1_1) {
                ngx_bootstrap_1 = ngx_bootstrap_1_1;
            },
            function (navBar_component_1_1) {
                navBar_component_1 = navBar_component_1_1;
            },
            function (dropDownQuestionFilter_component_1_1) {
                dropDownQuestionFilter_component_1 = dropDownQuestionFilter_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (questions_component_1_1) {
                questions_component_1 = questions_component_1_1;
            },
            function (preventUnsavedChangesGuard_service_1_1) {
                preventUnsavedChangesGuard_service_1 = preventUnsavedChangesGuard_service_1_1;
            },
            function (upsertQuestion_component_1_1) {
                upsertQuestion_component_1 = upsertQuestion_component_1_1;
            },
            function (reviewTest_component_1_1) {
                reviewTest_component_1 = reviewTest_component_1_1;
            },
            function (TakeTest_component_1_1) {
                TakeTest_component_1 = TakeTest_component_1_1;
            },
            function (ShowTestResults_component_1_1) {
                ShowTestResults_component_1 = ShowTestResults_component_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            },
            function (results_component_1_1) {
                results_component_1 = results_component_1_1;
            },
            function (paging_component_1_1) {
                paging_component_1 = paging_component_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_modal_1_1) {
                ng2_modal_1 = ng2_modal_1_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: 'Questions', component: questions_component_1.QuestionsComponent },
                { path: 'UpSertQuestion', component: upsertQuestion_component_1.UpSertQuestionComponent },
                { path: 'UpSertQuestion/:_id', component: upsertQuestion_component_1.UpSertQuestionComponent },
                { path: '', component: questions_component_1.QuestionsComponent },
                { path: 'ReviewTest', component: reviewTest_component_1.ReviewTestComponent },
                { path: 'Results', component: results_component_1.ResultsComponent },
                { path: 'Error', component: error_component_1.ErrorComponent },
                { path: 'TakeTest', component: TakeTest_component_1.TakeTestComponent },
                { path: 'ShowTestResults', component: ShowTestResults_component_1.ShowTestResultsComponent },
                { path: '**', component: questions_component_1.QuestionsComponent },
            ];
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes), forms_1.ReactiveFormsModule, ngx_bootstrap_1.BsDropdownModule.forRoot(), ng2_modal_1.ModalModule],
                        declarations: [app_component_1.AppComponent, navBar_component_1.NavBarComponent,
                            spinner_component_1.SpinnerComponent, paging_component_1.PagingComponent, questions_component_1.QuestionsComponent, upsertQuestion_component_1.UpSertQuestionComponent, components_1.SwitchComponent,
                            dropDownQuestionFilter_component_1.DropDownQuestionFilterComponent, reviewTest_component_1.ReviewTestComponent,
                            TakeTest_component_1.TakeTestComponent, error_component_1.ErrorComponent, results_component_1.ResultsComponent, ShowTestResults_component_1.ShowTestResultsComponent,
                            messages_component_1.ControlMessages],
                        bootstrap: [app_component_1.AppComponent],
                        providers: [
                            {
                                provide: common_1.APP_BASE_HREF,
                                useValue: '',
                            },
                            preventUnsavedChangesGuard_service_1.PreventUnsavedChangesGuard,
                            validation_service_1.ValidationService
                        ]
                    })
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map