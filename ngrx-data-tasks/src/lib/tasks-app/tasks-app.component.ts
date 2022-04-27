import { Component, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { skip } from 'rxjs';

@Component({
  selector: 'app-tasks-app',
  templateUrl: './tasks-app.component.html',
  styleUrls: ['./tasks-app.component.scss']
})
export class TasksAppComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }

}
