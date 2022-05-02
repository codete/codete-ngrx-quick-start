import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Process } from './process';
import { ProcessAction } from './process.models';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();
  @Output() processAction = new EventEmitter<ProcessAction>();
  @Output() subscribeRealtime = new EventEmitter<void>();
  @Input() process: Process;
  constructor() { }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  ngOnInit() {
    this.subscribeRealtime.next();
  }

}
