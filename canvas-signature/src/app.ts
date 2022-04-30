//#region @notForNpm

// @browserLine
    import { NgModule } from '@angular/core';
// @browserLine
    import { Component, OnInit } from '@angular/core';

//#region @browser
    @Component({
      selector: 'app-canvas-signature',
      template: 'hello from canvas-signature'
    })
    export class CanvasSignatureComponent implements OnInit {
      constructor() { }

      ngOnInit() { }
    }

    @NgModule({
      imports: [],
      exports: [CanvasSignatureComponent],
      declarations: [CanvasSignatureComponent],
      providers: [],
    })
    export class CanvasSignatureModule { }
    //#endregion

    //#region @backend
    async function start(port: number) {
      console.log('hello world from backend');
    }

    export default start;

//#endregion

//#endregion