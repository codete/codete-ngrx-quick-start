//#region @notForNpm

//#region @browser
    import { NgModule } from '@angular/core';
    import { Component, OnInit } from '@angular/core';


    @Component({
      selector: 'app-simple-tasks',
      template: 'hello from simple-tasks'
    })
    export class SimpleTasksComponent implements OnInit {
      constructor() { }

      ngOnInit() { }
    }

    @NgModule({
      imports: [],
      exports: [SimpleTasksComponent],
      declarations: [SimpleTasksComponent],
      providers: [],
    })
    export class SimpleTasksModule { }
    //#endregion

    //#region @backend
    async function start(port: number) {
      console.log('hello world from backend');
    }

    export default start;

//#endregion

//#endregion