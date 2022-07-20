//#region @notForNpm

//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-process',
  template: 'hello from realtime-process'
})
export class RealtimeProcessComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  exports: [RealtimeProcessComponent],
  declarations: [RealtimeProcessComponent],
  providers: [],
})
export class RealtimeProcessModule { }
//#endregion

//#region @backend
async function start(port: number) {
  console.log('hello world from backend');
}

export default start;

//#endregion

//#endregion
