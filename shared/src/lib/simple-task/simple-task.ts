import { Firedev } from 'firedev';
import type { SimpleTaskController } from './simple-task.controller';

@Firedev.Entity({
  className: 'SimpleTask',
})
export class SimpleTask {
  public ctrl: SimpleTaskController;
  public static ctrl: SimpleTaskController;

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100
  })
  //#endregion
  name?: string;
}
