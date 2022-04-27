import { SyncState } from "../containers/synchonization/synchonization.models";
import { appConfigStoreKey } from "./app.reducer";

export interface InitalAppState {
  syncState: SyncState;
}

export interface InitalStoreState {
  [appConfigStoreKey]: InitalAppState;
}
