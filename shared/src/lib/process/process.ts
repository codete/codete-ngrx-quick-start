import * as _ from 'lodash'
import { Firedev } from "firedev";
import type { ProcessController } from './process.controller';
import { IProcess } from '../interfaces';

@Firedev.Entity({
  className: 'Process',
})
export class Process extends Firedev.Base.Entity<Process> {

  ctrl: ProcessController;
  static crtl: ProcessController;

  static from(options: Pick<IProcess, 'command'>) {
    return _.merge(new Process(), options);
  }

  //#region @backend
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 500
  })
  //#endregion
  command: string;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 10,
    default: 'created'
  })
  //#endregion
  state: 'created' | 'starting' | 'restarting' | 'active' | 'killing' | 'killed' | 'ended-with-error' | 'ended-ok';

  //#region @backend
  @Firedev.Orm.Column.Custom({
    default: null
  })
  //#endregion
  pid: number;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    default: null
  })
  //#endregion
  ppid: number;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    type: 'text',
    default: '',
  })
  //#endregion
  stdout: string;

  //#region @backend
  @Firedev.Orm.Column.Custom({
    type: 'text',
    default: '',
  })
  //#endregion
  stder: string;
}
