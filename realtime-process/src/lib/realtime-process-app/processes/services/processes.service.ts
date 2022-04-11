import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessController } from '@codete-ngrx-quick-start/shared';

@Injectable()
export class ProcessesService {
  constructor(
    public ctrl: ProcessController
  ) { }

}
