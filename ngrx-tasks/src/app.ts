//#region @notForNpm

//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngrx-tasks',
  template: 'hello from ngrx-tasks'
})
export class NgrxTasksComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  exports: [NgrxTasksComponent],
  declarations: [NgrxTasksComponent],
  providers: [],
})
export class NgrxTasksModule { }
//#endregion

//#region @backend
async function start(port: number) {
  console.log('hello world from backend');
}

export default start;

//#endregion

//#endregion
