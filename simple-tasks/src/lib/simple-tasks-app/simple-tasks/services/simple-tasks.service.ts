import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { host, ITask, SimpleTask, Task, TaskController } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { Resource, Rest } from "ng2-rest";
import { from, map, Observable, of } from 'rxjs';
import { Helpers } from 'tnp-core';

@Injectable()
export class SimpleTasksService {
  ctrl = SimpleTask.ctrl;

  constructor(
    protected taskBar: MatSnackBar
  ) {

  }
  handleError(error) {
    this.taskBar.open(error?.message)
  }
}
