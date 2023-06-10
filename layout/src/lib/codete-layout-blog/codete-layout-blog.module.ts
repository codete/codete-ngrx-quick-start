//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeteLayoutBlogComponent } from './codete-layout-blog.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '@codete-ngrx-quick-start/shared';

@NgModule({
  imports: [
    NgScrollbarModule,
    CommonModule,
    MaterialModule,
  ],
  declarations: [CodeteLayoutBlogComponent],
  exports: [CodeteLayoutBlogComponent]
})
export class CodeteLayoutBlogModule { }
//#endregion
