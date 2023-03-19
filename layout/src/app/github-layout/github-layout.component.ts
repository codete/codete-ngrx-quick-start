import { Component, OnInit } from '@angular/core';
import { host } from '@codete-ngrx-quick-start/shared';

@Component({
  selector: 'app-github-layout',
  templateUrl: './github-layout.component.html',
  styleUrls: ['./github-layout.component.scss']
})
export class GithubLayoutComponent implements OnInit {
  host = host;
  constructor() { }

  ngOnInit() {
  }

}
