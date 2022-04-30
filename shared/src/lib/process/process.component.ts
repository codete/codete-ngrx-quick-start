import { Component, Input, OnInit } from '@angular/core';
import { Process } from './process';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  @Input() process: Process;
  constructor() { }

  ngOnInit() {
  }

}
