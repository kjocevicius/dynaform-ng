import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: []
})
export class MaterialModuleModule { }
