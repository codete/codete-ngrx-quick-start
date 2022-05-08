import { Component, OnInit } from '@angular/core';
import { PixelsBatch } from '@codete-ngrx-quick-start/shared';
import { Store } from '@ngrx/store';
import { CanvasSignatureInitialState } from './canvas-signature.models';
import * as canvasSignatureSelectors from './selectors/canvas-signature.selectors';
import * as canvasSignatureAction from './actions/canvas-signature.actions';

@Component({
  selector: 'app-canvas-signature',
  templateUrl: './canvas-signature.container.html',
  styleUrls: ['./canvas-signature.container.scss']
})
export class CanvasSignatureContainer implements OnInit {
  constructor(
    private store: Store<CanvasSignatureInitialState>
  ) { }
  allData$ = this.store.select(canvasSignatureSelectors.allBatches);
  allowedToUndo$ = this.store.select(canvasSignatureSelectors.allowedToUndo);
  allowedToRedo$ = this.store.select(canvasSignatureSelectors.allowedToRedo);

  onNewData(batch: PixelsBatch) {
    this.store.dispatch(canvasSignatureAction.NEW_CANVAS_DATA_BATCH({ batch }));
  }

  onClear() {
    this.store.dispatch(canvasSignatureAction.CLEAR());
  }

  undo() {
    this.store.dispatch(canvasSignatureAction.UNDO());
  }

  redo() {
    this.store.dispatch(canvasSignatureAction.REDO());
  }

  ngOnInit() { }

}
