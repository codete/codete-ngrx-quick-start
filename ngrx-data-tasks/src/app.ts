//#region @notForNpm

//#region @browser
import { NgModule } from '@angular/core';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ngrx-data-tasks',
  template: 'hello from ngrx-data-tasks'
})
export class NgrxDataTasksComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  exports: [NgrxDataTasksComponent],
  declarations: [NgrxDataTasksComponent],
  providers: [],
})
export class NgrxDataTasksModule { }
//#endregion

//#region @backend
async function start(port: number) {
  console.log('hello world from backend');
}

export default start;

//#endregion

//#endregion
