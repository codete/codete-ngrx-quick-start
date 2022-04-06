import { Firedev } from 'firedev';
import { TaskController, Task, host, SubTaskController, SubTask } from '@codete-ngrx-quick-start/shared';

// @browserLine
import { NgModule, ViewEncapsulation } from '@angular/core';
// @browserLine
import { Component, OnInit } from '@angular/core';
// @browserLine
import { CodeteLayoutBlogModule } from "@codete-ngrx-quick-start/layout";
// @browserLine
import { RouterModule, Routes } from "@angular/router";


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
      .then(m => m.TasksNgrxDataModule),
  },
  {
    path: 'ngrx-tasks',
    loadChildren: () => import(`@codete-ngrx-quick-start/ngrx-tasks`)
      .then(m => m.TasksModule),
  },
];

@Component({
  selector: 'app-main',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  * {
    box-sizing: border-box;
  }

  `],
  template: `
  <app-codete-layout-blog>
    <router-outlet></router-outlet>
  </app-codete-layout-blog>
  `
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
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

  //#region @backend
  const config = {
    host,
    type: "sqlite",
    database: 'tmp-db.sqlite',
    synchronize: true,
    dropSchema: true,
    logging: false,

  } as Firedev.IConnectionOptions;
  //#endregion

  if(Firedev.isBrowser) {
    const appDiv: HTMLElement = document.getElementsByTagName('head').item(0);
    appDiv.innerHTML = `${appDiv.innerHTML} <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet">`;
  }

  const context = await Firedev.init({
    host,
    controllers: [TaskController, SubTaskController],
    entities: [Task, SubTask],
    disabledRealtime: true,
    //#region @backend
    config: config as any
    //#endregion
  });
  //#region @backend
  if (Firedev.isNode) {
    context.node.app.get('/hello', (req, res) => {
      res.send('Hello express')
    })
  }
  //#endregion
}

if (Firedev.isBrowser) {
  start()
}


export default start;

