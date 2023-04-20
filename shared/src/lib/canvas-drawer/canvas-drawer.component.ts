import * as _ from 'lodash';
import {
  AfterViewInit, Component, ElementRef, EventEmitter,
  HostListener, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { defer, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { EventDraw, PixelsBatch } from './canvas-drawer.models';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.scss']
})
export class CanvasDrawerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  destroyed$ = new Subject<void>();
  private _batches: PixelsBatch[] = [];
  undoWasUsed = false;

  @Input() set batches(newBatches: PixelsBatch[]) {
    const oldBatches = this._batches;
    const tempDraw = (newBatches.length === oldBatches.length + 1);
    this._batches = newBatches;

    if (!tempDraw || (tempDraw && this.undoWasUsed)) {
      this.undoWasUsed = true;
      this.clearCanvas();
      this._batches.forEach(batch => {
        this.drawBatch(batch);
      })
    }
  }

  get batches() {
    return this._batches;
  }
  @Output() newBatchOfPixels = new EventEmitter<PixelsBatch>();
  @Output() clear = new EventEmitter<void>();
  @ViewChild('canvas', { static: true }) _canvas: ElementRef;
  @ViewChild('sketch', { static: true }) _sketch: ElementRef;
  ctx: CanvasRenderingContext2D;
  mousedown = false;
  tempBatch: PixelsBatch = [];
  mouse = { x: 0, y: 0 };
  last_mouse = { x: 0, y: 0 };

  mouseActions$ = merge(
    defer(() => fromEvent<EventDraw>(this.canvas, 'mousemove')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'mousedown')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'mouseup')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'mouseout')),

    defer(() => fromEvent<EventDraw>(this.canvas, 'touchstart')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'touchmove')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'touchend')),
    defer(() => fromEvent<EventDraw>(this.canvas, 'touchcancel')),
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

  ngOnChanges() {

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

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

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
    this.ctx?.beginPath();
    this.ctx?.moveTo(x1, y1);
    this.ctx?.lineTo(x2, y2);
    this.ctx?.closePath();
    this.ctx?.stroke();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.recalculate(true);
      this.mouseActions$.pipe(
        takeUntil(this.destroyed$),
      ).subscribe(event => {
        if ((event.type === 'mousedown') || (event.type === 'touchstart')) {
          this.mousedown = true;
          this.tempBatch = [];
          this.undoWasUsed = false;
        }
        if (
          (event.type === 'mouseup') || (event.type === 'mouseout')
          || (event.type === 'touchend') || (event.type === 'touchcancel')
        ) {
          this.mousedown = false;
          if (this.tempBatch.length > 0) {
            this.newBatchOfPixels.emit(this.tempBatch);
            this.tempBatch = [];
          }
        }
        if ((event.type === 'mousemove') || (event.type === 'touchmove')) {
          this.last_mouse.x = this.mouse.x;
          this.last_mouse.y = this.mouse.y;
          this.mouse.x = ((event.type === 'touchmove') // @ts-ignore
            ? _.first(event.changedTouches)?.pageX
            : event.pageX) - this.offset.left;

          this.mouse.y = ((event.type === 'touchmove') // @ts-ignore
            ? _.first(event.changedTouches)?.pageY
            : event.pageY) - this.offset.top;

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
