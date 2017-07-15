import {Component, Input} from '@angular/core';
@Component({
    selector: 'spinner',
    template: `
        <div>
           <i *ngIf="visible" class="fa fa-spinner fa-spin fa-3x"></i>
        </div>`
})

export class SpinnerComponent {
    @Input() visible = true; 
}


