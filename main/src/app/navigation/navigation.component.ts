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
      title: '@ngrx/data task with subtask',
      imageLink: '/assets/backend-data-into-template.jpeg',
      link: '/ngrx-data-tasks'
    },
    {
      title: '@ngrx task with subtask',
      imageLink: '/assets/backend-data-into-template.jpeg',
      link: '/ngrx-tasks'
    },
    // {
    //   title: 'Getting <b>list of ids</b>/hashes at being just  <b>to</b> get list of <b>full models</b> later',
    //   imageLink: '/assets/backend-data-into-template.jpeg',
    //   link: '/list-of-ids-to-full-models'
    // },
    // {
    //   title: 'Handling <b>search results</b> and social <b>posts interactions</b> in rxjs',
    //   imageLink: '/assets/backend-data-into-template.jpeg',
    //   link: '/search-results-posts-interactions'
    // },
  ]

}
