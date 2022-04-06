//#region @notForNpm

// @browserLine
    import { NgModule } from '@angular/core';
// @browserLine
    import { Component, OnInit } from '@angular/core';

//#region @browser
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