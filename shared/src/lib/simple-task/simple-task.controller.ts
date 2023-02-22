import { Firedev } from 'firedev';
import { SimpleTask } from './simple-task';

@Firedev.Controller({
  className: 'SimpleTaskController',
  entity: SimpleTask
})
export class SimpleTaskController extends Firedev.Base.Controller<SimpleTask> {
  //#region @websql
  async initExampleDbData() {
    const repo = await this.connection.getRepository(SimpleTask);
    await repo.save(SimpleTask.from('my first task'));
    await repo.save(SimpleTask.from('my second task'));

    // const allTasks = await repo.find();
    // console.log({ allTasks })
  }
  //#endregion
}
