import * as _ from 'lodash'
import { Firedev } from "firedev";
import { Task } from "../task/task";
import type { SubTaskController } from "./subtask.controller";

@Firedev.Entity({
  className: 'SubTask',
})
export class SubTask extends Task {

  public ctrl: SubTaskController;
  public static ctrl: SubTaskController;
  static from(subtask: Partial<SubTask>) {
    const t = new SubTask();
    return _.merge(t, subtask);
  }

  //#region @backend
  @Firedev.Orm.Column.Custom()
  //#endregion
  taskId: number;
}
