import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { defer, fromEvent, tap } from 'rxjs';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() isSubtask: boolean;
  @ViewChild('checkbox', { static: true }) checkbox?: ElementRef;
  checkboxClick$ = defer(() =>
    fromEvent<KeyboardEventInit>(this.checkbox?.nativeElement as any, 'mouseup')
  );
  get taskIsDone(): boolean {
    return !!this.task?.isDone;
  }
  @Output() isDone = new EventEmitter<boolean>()

  @Input() task!: Task;
  constructor() { }

  ngOnInit(): void { }


  change(e?: MatCheckboxChange) {
    this.isDone.emit(e.checked);
  }
}
