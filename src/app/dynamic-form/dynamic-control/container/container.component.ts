import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DFormControl, DFormContainer, CONTAINER_TYPE } from 'dform-model';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DynamicControlService } from '../../service/dynamic-control.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'df-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input() displayFieldset = true;
  @Input() ngGroupObject: FormGroup;

  @Output() ngGroupChange = new EventEmitter();

  controlsArray: DFormControl[];
  containerVal: DFormContainer;

  constructor(private controlService: DynamicControlService) { }

  ngOnInit() {
  }

  onToggle(event: {originalEvent: any, collapsed: boolean}) {
    console.log('Fieldset toggled: ' + this.containerVal.name, event);
    if (event.collapsed) {
      this.controlService.clearValidatorsOfGroup(this.ngGroupObject);
      this.ngGroupObject.reset();
    } else {
      this.controlService.applyValidators(this.containerVal, this.ngGroupObject, true);
    }
  }

  isShowLabel(controlObject: DFormControl): boolean {
    return controlObject.label && !this.isContainer(controlObject);
  }

  isContainer(controlObject: DFormControl): boolean {
    return Object.keys(CONTAINER_TYPE).map(e => CONTAINER_TYPE[e]).indexOf(controlObject.type) > -1;
  }

  isRepeating(controlObject: DFormControl): boolean {
    return CONTAINER_TYPE.CONTAINER_REPEAT === controlObject.type;
  }

  setNgControlProperty(propName: string, fc: AbstractControl) {
    if (this.ngGroup) {
      this.ngGroup.controls[propName] = fc;
    }
  }

  @Input()
  set controls(controls: DFormControl[]) {
    console.log('Got controls: ', controls);
    this.controlsArray = controls;
    this.containerVal = {
      name: null,
      label: null,
      type: null,
      validators: null,
      controls: controls,
      horizontal: false,
      optional: false,
      repeat: false
    };
  }

  @Input()
  set container(container: DFormContainer) {
    console.log('Got container: ', container);
    this.containerVal = container;
    this.controlsArray = container ? container.controls : [];
  }

  @Input()
  set ngGroup(fg: FormGroup) {
    this.ngGroupObject = fg;
    this.ngGroupChange.emit(fg);
  }

  get ngGroup(): FormGroup {
    return this.ngGroupObject;
  }

}
