import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '@codete-ngrx-quick-start/shared';
import { map } from 'rxjs';
import { SubtasksService } from './subtasks.service';

@Component({
  selector: 'app-subtasks',
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.scss']
})
export class SubtasksComponent implements OnInit {
  @Input() taskId: number;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    this.subtasksService.getAll()
  }
  constructor(
    private subtasksService: SubtasksService
  ) { }

  subtasks$ = this.subtasksService.entities$.pipe(
    map(subtaks => {
      console.log('hello')
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
