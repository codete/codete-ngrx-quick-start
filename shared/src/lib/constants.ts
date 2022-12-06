/** True if running under e2e testing (e.g., launch URL ends `?e2e`) */

// @is-from-shared=constants
import { Firedev } from "firedev";
import { Helpers } from "tnp-helpers";
import { CLASS } from "typescript-class-helpers";

//#region @browser
export const isE2E = window.location.search.includes('e2e');
//#endregion
export const host = `http://localhost:4199`;

export const URL_FOR = (taget: Function) => {
  return {
    entityResourceUrl: `${host}/${Helpers.strings.plural(CLASS.getName(taget).toLowerCase())}/${Firedev.symbols.CRUD_TABLE_MODEL}/`,
    collectionResourceUrl: `${host}/${Helpers.strings.plural(CLASS.getName(taget).toLowerCase())}/${Firedev.symbols.CRUD_TABLE_MODELS}`,
  };
}

export const PATH_FOR = (taget: Function) => {
  return Helpers.strings.plural(CLASS.getName(taget).toLowerCase())
}
// @is-from-shared-end=constants
