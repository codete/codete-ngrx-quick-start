import { Component, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs';

@Component({
  selector: 'app-tasks-app',
  templateUrl: './tasks-app.component.html',
  styleUrls: ['./tasks-app.component.scss']
})
export class TasksAppComponent implements OnInit {

  constructor(private actionListener$: ActionsSubject) { }


  ngOnInit() {
    this.actionListener$.pipe(
      skip(1) // optional: skips initial logging done by ngrx
    ).subscribe((action) => console.info('ngrx action', action));
  }

}
