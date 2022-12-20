import { _ } from 'tnp-core';
import { Firedev } from "firedev";
import type { ProcessController } from './process.controller';
import { IProcess } from '../interfaces';
import { ProcessState } from './process.models';

@Firedev.Entity({
  className: 'Process',
})
export class Process extends Firedev.Base.Entity<Process> {

  ctrl: ProcessController;
  static ctrl: ProcessController;

  static from(options: Pick<IProcess, 'command'>) {
    return _.merge(new Process(), options) as Process;
  }

  start() {
    return this.ctrl.start(this.id).received.observable;
  }

  stop() {
    return this.ctrl.stop(this.id).received.observable;
  }

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 500
  })
  //#endregion
  command: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 10,
    default: 'created'
  })
  //#endregion
  state: ProcessState;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'int',
    default: null
  })
  //#endregion
  pid: number;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'int',
    default: null
  })
  //#endregion
  ppid: number;

   //#region @websql
   @Firedev.Orm.Column.Custom({
    type: 'text',
    default: '',
  })
  //#endregion
  output: string;
}
