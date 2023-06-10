import { Firedev } from 'firedev';
import {
  TaskController, Task, host, SubTaskController,
  SubTask, SimpleTask, SimpleTaskController
} from '@codete-ngrx-quick-start/shared';
//#region @browser
import { FiredevGithubForkMeCornerModule } from 'firedev-ui';
import { NgModule, NgZone, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CodeteLayoutBlogModule } from "@codete-ngrx-quick-start/layout";
import { RouterModule, Routes } from "@angular/router";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { createReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
    path: 'realtime-process',
    loadChildren: () => import(`@codete-ngrx-quick-start/realtime-process`)
      .then(m => m.RealtimeProcessAppModule),
  },
  {
    path: 'canvas-signature',
    loadChildren: () => import(`@codete-ngrx-quick-start/canvas-signature`)
      .then(m => m.CanvasSignatureAppModule),
  },
  {
    path: 'simple-tasks',
    loadChildren: () => import(`@codete-ngrx-quick-start/simple-tasks`)
      .then(m => m.SimpleTasksAppModule),
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

];

@Component({
  selector: 'app-main',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
})
export class MainComponent {
  constructor(
    private ngZone: NgZone
  ) { }

}

@NgModule({
  imports: [
    CodeteLayoutBlogModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      // maxAge: 25,
      // logOnly: environment.production
    }),
    FiredevGithubForkMeCornerModule,
  ],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule { }
//#endregion


async function start() {
  Firedev.Websql.useFakeTimeout(500);

  if (Firedev.isBrowser) {
    const appDiv: HTMLElement = document.getElementsByTagName('head').item(0);
    // appDiv.innerHTML = `${appDiv.innerHTML} <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet">`;
  }

  const context = await Firedev.init({
    host,
    controllers: [SimpleTaskController, TaskController, SubTaskController, ProcessController],
    entities: [SimpleTask, Task, SubTask, Process],
    //#region @websql
    config: {
      type: 'better-sqlite3',
      database: 'tmp-db.sqlite',
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

