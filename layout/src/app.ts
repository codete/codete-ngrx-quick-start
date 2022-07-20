//#region @notForNpm

//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  template: 'hello from layout'
})
export class LayoutComponent implements OnInit {
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
  console.log('hello world from backend');
}

export default start;

//#endregion

//#endregion
