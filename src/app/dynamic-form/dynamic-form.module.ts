import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModuleModule } from '../material-module/material-module.module';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { ContainerComponent } from './dynamic-control/container/container.component';
import { DynamicControlService } from './service/dynamic-control.service';
import { ContainerRepeatComponent } from './dynamic-control/container-repeat/container-repeat.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    DynamicFormComponent,
  ],
  declarations: [
    DynamicFormComponent,
    DynamicControlComponent,
    ContainerComponent,
    ContainerRepeatComponent,
  ],
  providers: [
    DynamicControlService
  ]
})
export class DynamicFormModule { }
