//#region @notForNpm

// @browserLine
    import { NgModule } from '@angular/core';
// @browserLine
    import { Component, OnInit } from '@angular/core';

//#region @browser
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