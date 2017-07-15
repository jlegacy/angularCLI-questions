import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'questionFilter',
  templateUrl: 'dropDownQuestionFilter.component.html'
}) 
export class DropDownQuestionFilterComponent {
  @Output() filterChange = new EventEmitter();

  emitFilterChange(choice) {
    this.filterChange.emit({ filter: choice });
  }

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  public items: string[] = ["Show All", "On Report"];
  public filter = "Show All"

  public dropDownSelected(choice) {
    this.emitFilterChange(choice);
  }

}