import {
  Component, EventEmitter, Inject,
  Input, OnInit, Optional, Output, SimpleChanges
} from '@angular/core';
import { SubTask, Task } from '@codete-ngrx-quick-start/shared';
import { map } from 'rxjs';
import { TasksEngineService } from '../../engine/tasks-engine.service';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.container.html',
  styleUrls: ['./subtasks.container.scss']
})
export class SubtasksComponent implements OnInit {
  @Input() taskId: number;
  @Output() close = new EventEmitter<void>();
  @Output() removeTask = new EventEmitter<number>();
  @Output() removeSubtask = new EventEmitter<SubTask>();

  constructor(
    private engine: TasksEngineService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.engine.fetchSubtaskAction()
  }


  subtasks$ = this.engine.allSubtasks(this).pipe(
    map(subtaks => {
      if (!this.taskId) {
        return [];
      }
      return subtaks.filter(f => f.taskId === this.taskId)
    })
  )

  ngOnInit() {
    // console.log('hellog')
    // this.subtasksService.getAll()
  }

}
