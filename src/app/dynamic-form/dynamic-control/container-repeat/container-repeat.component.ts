import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DFormContainer } from 'dform-model';
import { DynamicControlService } from '../../service/dynamic-control.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'df-container-repeat',
  templateUrl: './container-repeat.component.html',
  styleUrls: ['./container-repeat.component.css']
})
export class ContainerRepeatComponent implements OnInit {

  @Input() ngArrayObject: FormArray;

  @Output() ngArrayChange = new EventEmitter();

  containerVal: DFormContainer;

  constructor(private controlService: DynamicControlService) { }

  ngOnInit() {
  }

  add() {
    console.log('Add item for array: ', this.containerVal.name);
    const item = this.controlService.buildFormGroup(this.containerVal);
    this.ngArray.push(item);
  }

  remove(index: number) {
    console.log('Remove item for array: ', this.containerVal.name);
    this.ngArray.removeAt(index);
  }

  onToggle(event: {originalEvent: any, collapsed: boolean}) {
    console.log('Fieldset toggled: ' + this.containerVal.name, event);
    if (event.collapsed) {
      this.ngArray.controls = [];
    } else if (this.ngArray.controls.length === 0) {
      this.add();
    }
  }

  @Input()
  set container(container: DFormContainer) {
    console.log('Got container: ', container);
    this.containerVal = container;
  }

  @Input()
  set ngArray(fg: FormArray) {
    this.ngArrayObject = fg;
    this.ngArrayChange.emit(fg);
  }

  get ngArray(): FormArray {
    return this.ngArrayObject;
  }
}
