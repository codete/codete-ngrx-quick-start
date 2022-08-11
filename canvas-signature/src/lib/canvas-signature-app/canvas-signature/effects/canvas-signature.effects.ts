//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as canvasSignatureActions from '../actions/canvas-signature.actions'
import { switchMap, map, of } from "rxjs";

@Injectable()
export class CanvasSignatureEffects {
  constructor(private actions$: Actions) { }
}
//#endregion
