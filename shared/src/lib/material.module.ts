//#region @browser
import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";

export const materialModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule { }

//#endregion
