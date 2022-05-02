import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Process } from '../process';
import { ProcessAction } from '../process.models';

@Component({
  selector: 'app-process-sync',
  templateUrl: './process-sync.component.html',
  styleUrls: ['./process-sync.component.scss']
})
export class ProcessSyncComponent implements OnInit {
  @Output() processAction = new EventEmitter<ProcessAction>();
  @Input() process: Process;
  constructor() { }


  action(e: Event, action: ProcessAction) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.processAction.emit(action);
  }
  ngOnInit() {

  }

}
