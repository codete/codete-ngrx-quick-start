import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Task } from '@codete-ngrx-quick-start/shared';
import { TasksService } from './tasks-ngrx-data.service';
import * as _ from 'lodash';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-ngrx-data.component.html',
  styleUrls: ['./tasks-ngrx-data.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer?: MatDrawer;
  newTaskModel: string;
  toogled: Task;
  constructor(
    private tasksService: TasksService,
    protected breakpointObserver: BreakpointObserver,
  ) { }
  tasks$ = this.tasksService.entities$;

  async ngOnInit() {
    this.tasksService.getAll();
  }

  onCloseSubtaskMenu() {
    this.drawer?.close();
  }

  ngAfterViewInit(): void {

  }

  async add(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      await firstValueFrom(this.tasksService.add(Task.from({
        name: this.newTaskModel
      })));
      this.newTaskModel = '';
    }
  }

  onSave(isDone: boolean, task: Task) {
    task = _.cloneDeep(task) as Task;
    task.isDone = isDone;
    console.log({ isDone })
    this.tasksService.updateOneInCache(task);
  }

  async toogle(event: Event, task: Task) {
    this.toogled = task;
    setTimeout(async () => {
      task = _.cloneDeep(task) as Task;
      task.selected = !task.selected;
      this.tasksService.updateManyInCache(
        (await firstValueFrom(this.tasksService.entities$)).map(t => {
          t = _.cloneDeep(t) as Task;
          t.selected = false;
          return t;
        })
      );
      if (task.selected) {
        this.tasksService.updateOneInCache(task);
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
      event.stopPropagation();
    });

  }



}
