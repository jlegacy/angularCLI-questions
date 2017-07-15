System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, PagingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            PagingComponent = (function () {
                function PagingComponent() {
                    this.pageChange = new core_1.EventEmitter();
                    this.items = [];
                    this.numberOfPages = 0;
                    this.currentPage = 1;
                    this.firstPage = true;
                    this.lastPage = false;
                    this.pages = [];
                }
                PagingComponent.prototype.ngOnInit = function () {
                    this.firstPage = true;
                    this.numberOfPages = Math.round(this.items.length / 10);
                    for (var x = 1; x <= this.numberOfPages; x++) {
                        this.pages.push({ 'page': x });
                    }
                };
                PagingComponent.prototype.emitPageChange = function (page) {
                    this.pageChange.emit({ page: page });
                };
                PagingComponent.prototype.setPage = function (page) {
                    this.currentPage = page;
                    this.emitPageChange(this.currentPage);
                };
                PagingComponent.prototype.nextPage = function (page) {
                    if (this.currentPage < this.numberOfPages) {
                        this.currentPage = this.currentPage + 1;
                        this.emitPageChange(this.currentPage);
                    }
                };
                PagingComponent.prototype.prevPage = function (page) {
                    if (this.currentPage > 1) {
                        this.currentPage = this.currentPage - 1;
                        this.emitPageChange(this.currentPage);
                    }
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], PagingComponent.prototype, "pageChange", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PagingComponent.prototype, "items", void 0);
                PagingComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pagination',
                        template: "\n        <nav aria-label=\"Page navigation\">\n            <ul class=\"pagination\">\n        <li [class.disabled]=\"currentPage === 1\">\n            <a (click)=\"prevPage()\" aria-label=\"Previous\">\n            <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        </li>\n        <li [class.active]=\"page.page === currentPage\" class=\"active\" *ngFor=\"let page of pages\"><a  (click)=\"setPage(page.page)\">{{page.page}}</a></li>\n       \n        <li [class.disabled]=\"currentPage === numberOfPages\">\n            <a (click)=\"nextPage()\" aria-label=\"Next\">\n            <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        </li>\n            </ul>\n    </nav>"
                    }),
                    __metadata("design:paramtypes", [])
                ], PagingComponent);
                return PagingComponent;
            }());
            exports_1("PagingComponent", PagingComponent);
        }
    };
});
//# sourceMappingURL=paging.component.js.map