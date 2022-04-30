import { Component, Input, OnInit } from '@angular/core';
import { Process } from '../process';

@Component({
  selector: 'app-process-sync',
  templateUrl: './process-sync.component.html',
  styleUrls: ['./process-sync.component.scss']
})
export class ProcessSyncComponent implements OnInit {

  @Input() process: Process;
  constructor() { }


  action(e: Event) {
    e.stopImmediatePropagation();
    e.stopPropagation();
  }
  ngOnInit() {

  }

}
