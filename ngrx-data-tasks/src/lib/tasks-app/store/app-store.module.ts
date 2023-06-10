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
    StoreModule.forFeature(appConfigStoreKey, metaReducers),
    EffectsModule.forFeature([AppEffects]),
    AppEntityStoreModule,
  ],
})
export class AppStoreModule { }
//#endregion
