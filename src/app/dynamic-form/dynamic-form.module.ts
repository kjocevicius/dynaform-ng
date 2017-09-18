import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FieldsetModule,
  InputTextModule,
  DropdownModule,
  CalendarModule,
  CheckboxModule,
  InputMaskModule,
} from 'primeng/primeng';

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

    FieldsetModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputMaskModule,
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    DynamicFormComponent,

    // FieldsetModule,
    // InputTextModule,
    // DropdownModule,
    // CalendarModule,
    // CheckboxModule,
    // InputMaskModule,
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
