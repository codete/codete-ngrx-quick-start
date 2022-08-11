//#region @browser
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { skip, debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { TasksEngineService } from './tasks-engine.service';
import * as appActions from '../store/app.actions';

@Component({
  selector: 'app-tasks-engine',
  templateUrl: './tasks-engine.component.html',
  styleUrls: ['./tasks-engine.component.scss']
})
export class TasksEngineComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  message?: string;
  constructor(
    private engine: TasksEngineService,
    private store: Store<any>,
    private actionListener$: ActionsSubject,
  ) { }
  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.message = this.engine.helloWorld();
    // TODO this should be moved to effect
    this.activeteSynchonization();
  }

  activeteSynchonization() {
    this.actionListener$.pipe(
      skip(1), // optional: skips initial logging done by ngrx,
      takeUntil(this.destroy$),
      // debounceTime(5000),
      // tap(() => {
      //   this.store.dispatch(appActions.SYNC());
      // })
    ).subscribe((action) => {
      // console.info('ngrx action', action);
    });
  }

}
//#endregion
