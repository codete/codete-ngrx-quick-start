//#region @browser
import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEntityStoreModule } from './app-entity-store.module';
import { appReducer as appConfigReducer, appMetaReducer, appConfigStoreKey } from './app.reducer';
import { AppEffects } from './app.effects';


export const metaReducers: MetaReducer<any>[] = [
  appMetaReducer,
]

@NgModule({
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature(appConfigStoreKey, appConfigReducer),
    StoreDevtoolsModule.instrument(),
    AppEntityStoreModule,
  ],
})
export class AppStoreModule { }
//#endregion
