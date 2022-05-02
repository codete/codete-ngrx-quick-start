import { _ } from 'tnp-core';
import { Firedev } from "firedev";
import type { TaskController } from './task.controller';
import { ITask } from '../interfaces';
import { URL_FOR } from '../constants';
import type { SubTask } from '../subtask/subtask';

@Firedev.Entity({
  className: 'Task',
})
export class Task extends Firedev.Base.Entity<Task> {
  public static URLS = URL_FOR(Task);
  public ctrl: TaskController;
  public static ctrl: TaskController;

  public static saveAll(entites: Task[]) {
    return this.ctrl.saveAll(entites);
  }

  static from(task: Partial<ITask>) {
    const t = new Task();
    return _.merge(t, task);
  }

  //#region @backend
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100
  })
  //#endregion
  name?: string;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    default: false
  })
  //#endregion
  isDone?: boolean;

  selected?: boolean;

  subtasks?: SubTask[] = [];
}
