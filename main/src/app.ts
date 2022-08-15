import { Firedev } from 'firedev';
import { TaskController, Task, host, SubTaskController, SubTask } from '@codete-ngrx-quick-start/shared';

//#region @browser
import { NgModule, NgZone, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CodeteLayoutBlogModule } from "@codete-ngrx-quick-start/layout";
import { RouterModule, Routes } from "@angular/router";
//#endregion
import { ProcessController, Process } from '@codete-ngrx-quick-start/shared';


//#region @browser
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./app/navigation/navigation.module`)
      .then(m => m.NavigationModule),
  },
  {
    path: 'ngrx-data-tasks',
    loadChildren: () => import(`@codete-ngrx-quick-start/ngrx-data-tasks`)
      .then(m => m.TasksAppModule1),
  },
  {
    path: 'ngrx-tasks',
    loadChildren: () => import(`@codete-ngrx-quick-start/ngrx-tasks`)
      .then(m => m.TasksAppModule2),
  },
  {
    path: 'realtime-process',
    loadChildren: () => import(`@codete-ngrx-quick-start/realtime-process`)
      .then(m => m.RealtimeProcessAppModule),
  },
  {
    path: 'canvas-signature',
    loadChildren: () => import(`@codete-ngrx-quick-start/canvas-signature`)
      .then(m => m.CanvasSignatureAppModule),
  },
];

@Component({
  selector: 'app-main',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  template: `
  <app-codete-layout-blog>
    <router-outlet></router-outlet>
  </app-codete-layout-blog>
  `
})
export class MainComponent implements OnInit {
  constructor(
    ngZone: NgZone
  ) {
    Firedev.initNgZone(ngZone);
  }

  ngOnInit() { }
}

if (Firedev.isBrowser) {
  start()
}


@NgModule({
  imports: [
    CodeteLayoutBlogModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule { }
//#endregion


async function start() {
  // Firedev.enableProductionMode();

  if (Firedev.isBrowser) {
    const appDiv: HTMLElement = document.getElementsByTagName('head').item(0);
    // appDiv.innerHTML = `${appDiv.innerHTML} <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet">`;
  }

  const context = await Firedev.init({
    host,
    controllers: [TaskController, SubTaskController, ProcessController],
    entities: [Task, SubTask, Process],
    //#region @backend
    config: {
      type: 'better-sqlite3',
      database: 'tmp-db.sqlite',
      synchronize: true,
      dropSchema: true,
      logging: false,
    }
    //#endregion
  });
  //#region @backend
  if (Firedev.isNode) {
    context.node.app.get('/hello', (req, res) => {
      res.send('Hello express')
    })
  }
  //#endregion


  // console.log(`HEHEHEHHEHEH: ${SubTask.name}: ${CLASS.getName(SubTask)}`);
}



export default start;

