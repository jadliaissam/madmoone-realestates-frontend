import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state-v2',
  templateUrl: './empty-state-v2.component.html',
  styleUrls: ['./empty-state-v2.component.scss']
})
export class EmptyStateV2Component implements OnInit {

  @Input() public mainClass = '';
  @Input() secondClass = '';
  @Input() title = '';
  @Input() description = '';
  @Input() hasAction = false;
  @Input() actionTitle = '';

  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  doAction(){
    this.action.emit(true);
  }
}
