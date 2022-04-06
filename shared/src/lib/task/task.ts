import * as _ from 'lodash'
import { Firedev } from "firedev";
import type { TaskController } from './task.controller';
import { ITask } from '../interfaces';


@Firedev.Entity({
  className: 'Task',
})
export class Task extends Firedev.Base.Entity<Task> {
  public ctrl: TaskController;
  public static ctrl: TaskController;
  static from(task: Partial<ITask>) {
    const t = new Task();
    return _.merge(t, task);
  }

  //#region @backend
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

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

}
