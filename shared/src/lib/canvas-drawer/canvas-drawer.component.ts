import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { defer, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { PixelsBatch } from './canvas-drawer.models';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.scss']
})
export class CanvasDrawerComponent implements OnInit, AfterViewInit, OnDestroy {
  destroyed$ = new Subject<void>();
  @Input() batches: PixelsBatch[];
  @Output() newBatchOfPixels = new EventEmitter<PixelsBatch>();
  @ViewChild('canvas', { static: true }) _canvas: ElementRef;
  @ViewChild('sketch', { static: true }) _sketch: ElementRef;
  ctx: CanvasRenderingContext2D;
  mousedown = false;
  tempBatch: PixelsBatch = [];
  mouse = { x: 0, y: 0 };
  last_mouse = { x: 0, y: 0 };

  mouseActions$ = merge(
    defer(() => fromEvent<MouseEvent>(this.canvas, 'mousemove')),
    defer(() => fromEvent<MouseEvent>(this.canvas, 'mousedown')),
    defer(() => fromEvent<MouseEvent>(this.canvas, 'mouseup')),
    defer(() => fromEvent<MouseEvent>(this.canvas, 'mouseout')),
  );

  get canvas() {
    return this._canvas.nativeElement as HTMLCanvasElement;
  }

  get sketch() {
    return this._sketch.nativeElement as HTMLCanvasElement;
  }

  get offset() {
    const rect = this.canvas.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  recalculate(readCtx = false) {
    if (readCtx) {
      this.ctx = this.canvas.getContext('2d');
    }
    var sketch_style = getComputedStyle(this.sketch);
    this.canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    this.canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    this.ctx.lineWidth = 2;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'black';
  }

  constructor() { }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
  ngOnInit() { }


  drawCurrentPixels() {
    if (this.batches) {
      this.batches.forEach(b => this.drawBatch(b))
    }
  }

  private drawBatch(batch: PixelsBatch) {
    batch.forEach(([x1, y1, x2, y2]) => {
      this.drawLine(x1, y1, x2, y2);
    })
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.recalculate(true);
      this.mouseActions$.pipe(
        takeUntil(this.destroyed$),
      ).subscribe(event => {
        if (event.type === 'mousedown') {
          this.mousedown = true;
          this.tempBatch = [];
        }
        if ((event.type === 'mouseup') || (event.type === 'mouseout')) {
          this.mousedown = false;
          this.newBatchOfPixels.emit(this.tempBatch);
          this.tempBatch = [];
        }
        if (event.type === 'mousemove') {
          this.last_mouse.x = this.mouse.x;
          this.last_mouse.y = this.mouse.y;
          this.mouse.x = event.pageX - this.offset.left;
          this.mouse.y = event.pageY - this.offset.top;
          if (this.mousedown) {
            this.tempBatch.push(
              [this.last_mouse.x, this.last_mouse.y, this.mouse.x, this.mouse.y]
            );
            this.drawLine(this.last_mouse.x, this.last_mouse.y, this.mouse.x, this.mouse.y);
          }
        }

      })
    })

  }

}
