//#region @notForNpm

// @browserLine
    import { NgModule } from '@angular/core';
// @browserLine
    import { Component, OnInit } from '@angular/core';

//#region @browser
    @Component({
      selector: 'app-shared',
      template: 'hello from shared'
    })
    export class SharedComponent implements OnInit {
      constructor() { }

      ngOnInit() { }
    }

    @NgModule({
      imports: [],
      exports: [SharedComponent],
      declarations: [SharedComponent],
      providers: [],
    })
    export class SharedModule { }
    //#endregion

    //#region @backend
    async function start(port: number) {
      console.log('hello world from backend');
    }

    export default start;

//#endregion

//#endregion