import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { defer, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.scss']
})
export class CanvasDrawerComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('canvas', { static: true }) canvasElement: ElementRef;

  mouseActions$ = merge(
    defer(() => fromEvent<MouseEvent>(this.$canvas, 'mousemove')),
    defer(() => fromEvent<MouseEvent>(this.$canvas, 'mousedown')),
    defer(() => fromEvent<MouseEvent>(this.$canvas, 'mouseup')),
    defer(() => fromEvent<MouseEvent>(this.$canvas, 'mouseout')),
  );


  ctx: CanvasRenderingContext2D;
  flag = false;
  dot_flag = false;
  prevX = 0;
  prevY = 0;
  currX = 0;
  currY = 0;
  color = 'black';
  thickness = 2;

  changes(e: MouseEvent) {
    if (!this.$canvas) {
      return;
    }
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.currX = e.clientX - this.$canvas.offsetLeft;
    this.currY = e.clientY - this.$canvas.offsetTop;
    // console.log({
    //   'this.currX': this.currX,
    //   'this.currY': this.currY,
    // })
    if (e.type == 'mousedown') {
      this.flag = true;
    }
    if (e.type == 'mouseup' || e.type == 'mouseout') {
      this.flag = false;
    }
    if (e.type == 'mousemove') {
      if (this.flag) {
        // console.log('begin drawing')
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.thickness;
        this.ctx.stroke();
        this.ctx.closePath();
        // console.log('end drawing')
      }
    }
  }

  clear() {
    const c_width = this.$canvas.width;
    const c_height = this.$canvas.height;
    this.ctx.clearRect(0, 0, c_width, c_height);
    // $('#canvasimg').hide();/
  }

  get $canvas() {
    return this.canvasElement?.nativeElement as HTMLCanvasElement;
  }

  ngAfterViewInit(): void {
    this.ctx = this.$canvas.getContext('2d');
    this.mouseActions$.subscribe(e => this.changes(e));
  }

}
