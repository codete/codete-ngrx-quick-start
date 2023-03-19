//#region @notForNpm
import { host } from '@codete-ngrx-quick-start/shared';

//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `hello from layout

  <img src="layout/src/assets/rxjs.png" height="200" width="auto" >
  `
})
export class LayoutComponent implements OnInit {
  host = host;
  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  providers: [],
})
export class LayoutModule { }
//#endregion

//#region @backend
async function start(port: number) {

  console.log('hello world from layout', host);
}

export default start;

//#endregion

//#endregion
