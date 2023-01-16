import { Firedev } from 'firedev';
import { SimpleTask } from './simple-task';

@Firedev.Controller({
  className: 'SimpleTaskController',
  entity: SimpleTask
})
export class SimpleTaskController extends Firedev.Base.Controller<SimpleTask> {

}
