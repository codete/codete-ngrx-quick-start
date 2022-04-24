import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEntityStoreModule } from './app-entity-store.module';

export const metaReducers: MetaReducer<any>[] =  []

@NgModule({
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('appConfig', {}),    
    StoreDevtoolsModule.instrument(),
    AppEntityStoreModule,
  ],
})
export class AppStoreModule {}
