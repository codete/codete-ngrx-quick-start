//#region @browser
import { PlatformLocation, Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, share, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-codete-layout-blog',
  templateUrl: './codete-layout-blog.component.html',
  styleUrls: ['./codete-layout-blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeteLayoutBlogComponent implements OnInit {
  useOpenLayout = true;
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(val => {
        return val instanceof NavigationEnd;
      }),
      map(v => {
        return (v as NavigationEnd).url;
      }),
      map(u => {
        return u !== '/';
      }),
      tap((useOpenLayout) => {
        this.useOpenLayout = useOpenLayout;
      })
    );
  }

  gotoroot() {
    this.router.navigateByUrl('/');
  }


  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe()
  }


}
//#endregion
