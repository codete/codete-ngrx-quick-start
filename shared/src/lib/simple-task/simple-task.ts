import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { SimpleTaskController } from './simple-task.controller';

@Firedev.Entity({
  className: 'SimpleTask',
})
export class SimpleTask {
  public ctrl: SimpleTaskController;
  public static ctrl: SimpleTaskController;

  public static from(contentOrObject: string | ISimpleTask) {
    if (_.isString(contentOrObject)) {
      const ins = new SimpleTask();
      ins.content = contentOrObject;
      return ins;
    }
    return _.merge(new SimpleTask(), contentOrObject);
  }

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'boolean',
    default: false
  })
  //#endregion
  love: boolean;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100
  })
  //#endregion
  content?: string;
}

export type ISimpleTask = Omit<Partial<SimpleTask>, 'ctrl'>;
