import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({

    styles: [],
    selector: 'pagination',
    template: `
        <nav aria-label="Page navigation">
            <ul class="pagination">
        <li [class.disabled]="currentPage === 1">
            <a (click)="prevPage()" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li [class.active]="page.page === currentPage" class="active" *ngFor="let page of pages"><a  (click)="setPage(page.page)">{{page.page}}</a></li>
       
        <li [class.disabled]="currentPage === numberOfPages">
            <a (click)="nextPage()" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
            </ul>
    </nav>`
})

export class PagingComponent implements OnInit {
    @Output() pageChange = new EventEmitter();
    @Input() items = [];
    numberOfPages = 0;
    currentPage = 1;
    firstPage = true;
    lastPage = false;
    pages = [];

    constructor() { }

    ngOnInit() {
        this.firstPage = true;
        this.numberOfPages = Math.round(this.items.length / 10);
        for (var x = 1; x <= this.numberOfPages; x++) {
            this.pages.push({ 'page': x });
        }

    }

    emitPageChange(page) {
        this.pageChange.emit({ page: page });
    }

    setPage(page) {
        this.currentPage = page;
        this.emitPageChange(this.currentPage);
    }
    nextPage(page) {
        if (this.currentPage < this.numberOfPages) {
            this.currentPage = this.currentPage + 1;
            this.emitPageChange(this.currentPage);
        }
    }
    prevPage(page) {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.emitPageChange(this.currentPage);
        }


    }


}