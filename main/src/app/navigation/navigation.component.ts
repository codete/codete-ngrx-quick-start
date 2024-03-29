//#region @browser
import { Component, OnInit } from '@angular/core';
import { Topic, MaterialModule } from "@codete-ngrx-quick-start/shared";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  topicsPart1: Topic[] = [
    {
      title: 'html <b>canvas</b> - drawing <b>signature</b>',
      imageLink: '',
      link: '/canvas-signature'
    },
    {
      title: 'realtime <b>node process</b>',
      imageLink: '',
      link: '/realtime-process'
    },
    {
      title: 'simple socket <b>tasks</b>',
      imageLink: '',
      link: '/simple-tasks'
    },
  ];

  topicsPart2: Topic[] = [
    {
      title: 'ngrx/data - <b>tasks with subtask</b>',
      imageLink: '',
      link: '/ngrx-data-tasks'
    },
    {
      title: 'standard ngrx - <b>tasks with subtask</b>',
      imageLink: '',
      link: '/ngrx-tasks'
    },
  ];

}
//#endregion
