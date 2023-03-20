import { Firedev } from 'firedev';
import { ISimpleTask, SimpleTask } from './simple-task';

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
    await repo.save(SimpleTask.from({
      love: true,
      content: 'third task'
    }));

    // const allTasks = await repo.find();
    // console.log({ allTasks })
  }
  //#endregion


  @Firedev.Http.PUT()
  updateLove(@Firedev.Http.Param.Path('taskId') taskId: number, @Firedev.Http.Param.Query('love') love: boolean): Firedev.Response<SimpleTask> {
    //#region @websqlFunc
    return async (req, res) => {
      const repo = await this.connection.getRepository<SimpleTask>(SimpleTask);
      let task = await repo.findOne({
        where: {
          id: taskId
        }
      });
      task.love = love;
      await repo.update(taskId, task);
      return task;
    }
    //#endregion
  }

  @Firedev.Http.GET(`/${Firedev.symbols.CRUD_TABLE_MODELS}`) // @ts-ignore
  getAll(@Firedev.Http.Param.Query('loved') lovedFirst: boolean): Firedev.Response<SimpleTask[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {

      let arr = await Firedev.getResponseValue(config, req, res) as SimpleTask[];
      if (lovedFirst) {
        const loved = arr.filter(t => t.love);
        const notLove = arr.filter(t => !t.love);
        arr = [
          ...loved,
          ...notLove,
        ]
      }
      return arr as any;
    }
    //#endregion
  }

}
