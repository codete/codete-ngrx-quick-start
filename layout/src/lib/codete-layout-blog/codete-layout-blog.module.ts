import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeteLayoutBlogComponent } from './codete-layout-blog.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    NgScrollbarModule,
    CommonModule,
  ],
  declarations: [CodeteLayoutBlogComponent],
  exports: [CodeteLayoutBlogComponent]
})
export class CodeteLayoutBlogModule { }
