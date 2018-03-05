import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: []
})
export class MaterialModuleModule { }
