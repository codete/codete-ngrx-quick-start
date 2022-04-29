import {
  Component, EventEmitter, Inject,
  Input, OnInit, Optional, Output, SimpleChanges
} from '@angular/core';
import { SubTask, Task } from '@codete-ngrx-quick-start/shared';
import { map, tap, combineLatest, combineLatestWith, of } from 'rxjs';
import { TasksEngineService } from '../../engine/tasks-engine.service';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.container.html',
  styleUrls: ['./subtasks.container.scss'],
})
export class SubtasksComponent implements OnInit {
  @Input() taskId: number;
  @Output() close = new EventEmitter<void>();
  @Output() removeTask = new EventEmitter<number>();
  @Output() removeSubtask = new EventEmitter<SubTask>();
  @Output() newSubtask = new EventEmitter<string>();
  tempSubtask: string;
  tasksLoaded = false;


  constructor(
    private engine: TasksEngineService,
  ) { }

  isLoadingSubtasks$ = this.engine.isProcessingSubtaskRequestSelector;

  isAddingSubtask$ = this.engine.isProcessingSubtaskRequestSelector;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskId) {
      this.tasksLoaded = false;
      this.engine.fetchSubtaskAction(this.taskId)
    }
  }

  onSaveName(name: string, subtask: SubTask) {
    this.engine.onSaveSubTaskAction({ name }, subtask);
  }

  onNewSubtask(event: KeyboardEvent) {
    this.engine.addSubTaskAction(event, this);
  }

  async onRemove(subtask: SubTask) {
    this.engine.removeSubTaskAction(subtask);
  }

  onSave(isDone: boolean, subtask: SubTask) {
    this.engine.onSaveSubTaskAction({ isDone }, subtask);
  }

  subtasks$ = this.engine.allSubtasks(this).pipe(
    map(subtaks => {
      if (!this.taskId) {
        return [];
      }
      return subtaks.filter(f => f.taskId === this.taskId)
    }),
    tap(() => {
      this.tasksLoaded = true;
    }),
  )

  ngOnInit() {
    // console.log('hellog')
    // this.subtasksService.getAll()
  }

}
