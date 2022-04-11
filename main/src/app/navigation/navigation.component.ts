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

  topics: Topic[] = [
    {
      title: '<b>ngrx/data task</b> with subtask',
      imageLink: '/assets/backend-data-into-template.jpeg',
      link: '/ngrx-data-tasks'
    },
    {
      title: '<b>ngrx task</b> with subtask',
      imageLink: '/assets/backend-data-into-template.jpeg',
      link: '/ngrx-tasks'
    },
    {
      title: 'realtime <b>node process</b>',
      imageLink: '/assets/backend-data-into-template.jpeg',
      link: '/realtime-process'
    },
  ]

}
