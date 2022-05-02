import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { _ } from 'tnp-core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { defer, fromEvent, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SubTask } from '../subtask/subtask';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @ViewChild('taskinput') taskInput: ElementRef;
  @Input() isSubtask: boolean;
  @Input() editable: boolean;
  @Input() isSavingTask: boolean;
  focusTriggered = new Subject<void>();
  @Output() remove = new EventEmitter<Task>();
  @Output() focused = new EventEmitter<void>();
  editableTask: Task | SubTask;
  destroyed$ = new Subject();
  @ViewChild('checkbox', { static: true }) checkbox?: ElementRef;
  checkboxClick$ = defer(() =>
    fromEvent<KeyboardEventInit>(this.checkbox?.nativeElement as any, 'mouseup')
  );
  get taskIsDone(): boolean {
    return !!this.task?.isDone;
  }
  @Output() isDone = new EventEmitter<boolean>();
  @Output() saveName = new EventEmitter<string>();

  @Input() task!: Task;
  constructor() {

  }

  onFocused(event: Event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.focused.emit();
  }


  editTask(event?: InputEvent) {
    event?.stopImmediatePropagation();
    event?.stopPropagation();
    (this.taskInput.nativeElement as HTMLElement).focus();
  }

  ngOnInit(): void {
    this.editableTask = _.cloneDeep(this.task);
    this.focusTriggered.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.editTask()
    })
  }

  ngAfterViewInit(): void {

  }

  onInputChange(e: Event) {
    this.saveName.next(e.target['value'])
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.unsubscribe();
  }

  change = ((e?: MatCheckboxChange) => {
    this.isDone.emit(e.checked);
  });
}
