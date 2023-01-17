import { Firedev } from 'firedev';
import type { SimpleTaskController } from './simple-task.controller';

@Firedev.Entity({
  className: 'SimpleTask',
})
export class SimpleTask {
  public ctrl: SimpleTaskController;
  public static ctrl: SimpleTaskController;

  public static from(content: string) {
    const ins = new SimpleTask();
    ins.content = content;
    return ins;
  }

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
  content?: string;
}

export type ISimpleTask = Omit<Partial<SimpleTask>, 'ctrl'>;
