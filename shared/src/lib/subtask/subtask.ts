import { _ } from 'tnp-core';
import { Firedev } from "firedev";
import { Task } from "../task/task";
import type { SubTaskController } from "./subtask.controller";
import { URL_FOR } from '../constants';
import { ISubTask } from '../interfaces';

@Firedev.Entity({
  className: 'SubTask',
}) // @ts-ignore
export class SubTask extends Task {
  public static URLS = URL_FOR(SubTask);

  // @ts-ignore
  public ctrl: SubTaskController;
  public static ctrl: SubTaskController;

  public static saveAll(entites: (SubTask | ISubTask)[]) {
    return this.ctrl.saveAll<SubTask>(entites as any);
  }

  static from(subtask: Partial<SubTask> | ISubTask) {
    const t = new SubTask();
    return _.merge(t, subtask);
  }

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'int'
  })
  //#endregion
  taskId: number;
}
