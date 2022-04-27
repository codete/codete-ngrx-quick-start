import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import * as _ from 'lodash';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { defer, fromEvent, tap } from 'rxjs';
import { SubTask } from '../subtask/subtask';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() isSubtask: boolean;
  @Input() editable: boolean;
  @Output() remove = new EventEmitter<Task>();
  editableTask: Task | SubTask;
  @ViewChild('checkbox', { static: true }) checkbox?: ElementRef;
  checkboxClick$ = defer(() =>
    fromEvent<KeyboardEventInit>(this.checkbox?.nativeElement as any, 'mouseup')
  );
  get taskIsDone(): boolean {
    return !!this.task?.isDone;
  }
  @Output() isDone = new EventEmitter<boolean>()

  @Input() task!: Task;
  constructor() {

  }

  ngOnInit(): void {
    this.editableTask = _.cloneDeep(this.task);
  }


  change(e?: MatCheckboxChange) {
    this.isDone.emit(e.checked);
  }
}
