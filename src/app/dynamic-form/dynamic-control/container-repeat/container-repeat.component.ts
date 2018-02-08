import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynamicControlService } from '../../service/dynamic-control.service';
import { DFormContainer } from 'dynaform-model';

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
    const item = this.controlService.buildFormGroup(this.containerVal);
    this.ngArray.push(item);
  }

  remove(index: number) {
    this.ngArray.removeAt(index);
  }

  onOpen() {
    if (this.ngArray.controls.length === 0) {
      this.add();
    }
  }

  onClose() {
    this.ngArray.controls = [];
  }

  @Input()
  set container(container: DFormContainer) {
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
