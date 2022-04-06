import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Task } from '@codete-ngrx-quick-start/shared';
import { TasksService } from './tasks-ngrx-data.service';
import { from, defer, map, switchMap } from "rxjs";
import * as _ from 'lodash';
import { firstValueFrom, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
// @ts-ignore
import styles from './tasks-ngrx-data.component.scss';

const sassFile = (styles: string) => {
  const lines = (styles.split('\n'));
  return {
    stringValue: (name: string) => {
      for (let index = 0; index < lines.length; index++) {
        const l = lines[index];
        const [varName, value] = l.trim().split(':');
        if (varName === name) {
          return value.replace(';', '');
        }
      }
    },
    numberValue: (name: string): number => {
      for (let index = 0; index < lines.length; index++) {
        const l = lines[index];
        const [varName, value] = l.trim().split(':');
        if (varName === name) {
          return Number(value.replace('px', '').replace(';', ''));
        }
      }
    }
  }
}



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-ngrx-data.component.html',
  styleUrls: ['./tasks-ngrx-data.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') drawer?: MatDrawer;
  toogled: Task;
  constructor(
    private tasksService: TasksService,
    protected breakpointObserver: BreakpointObserver,
  ) { }
  tasks$ = this.tasksService.entities$; // @ts-ignore
  sassFile = sassFile(styles);

  async ngOnInit() {
    this.tasksService.getAll();
    console.log(this.sassFile.stringValue('--max-container-size'))
    console.log(this.sassFile.numberValue('--max-container-size'))
  }

  onCloseSubtaskMenu() {
    this.drawer?.close();
  }

  ngAfterViewInit(): void {

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
