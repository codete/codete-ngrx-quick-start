import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-here-placeholder',
  templateUrl: './sign-here-placeholder.component.html',
  styleUrls: ['./sign-here-placeholder.component.scss']
})
export class SignHerePlaceholderComponent implements OnInit {

  @Input() size = 200;

  constructor() { }

  ngOnInit() {
  }

}
