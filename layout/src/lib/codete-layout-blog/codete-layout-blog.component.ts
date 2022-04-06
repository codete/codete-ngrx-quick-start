import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, share, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-codete-layout-blog',
  templateUrl: './codete-layout-blog.component.html',
  styleUrls: ['./codete-layout-blog.component.scss']
})
export class CodeteLayoutBlogComponent implements OnInit {

  destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  useOpenLayout$ = this.router.events.pipe(
    filter(val => {
      return val instanceof NavigationEnd;
    }),
    map(v => {
      return (v as NavigationEnd).url;
    }),
    map(u => {
      return u === '/';
    }),
    takeUntil(this.destroyed$),
    share()
  );

  useCloseLayout$ = this.useOpenLayout$.pipe(
    map(v => !v)
  );

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe()
  }


}
