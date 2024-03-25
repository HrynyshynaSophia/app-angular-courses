/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { Validator } from '@angular/forms';
@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
    },
  ],
})
export class DurationComponent implements ControlValueAccessor, Validator {
  constructor() {
    this.customControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  private onChange: any = () => {};
  private onTouched: any = () => {};
  customControl = new FormControl(0, [
    Validators.required,
    this.formatValidator.bind(this),
  ]);
  validate(): ValidationErrors | null {
    return this.customControl.errors;
  }

  writeValue(value: any): void {
    this.customControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private formatValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (value) {
      const isValid = /^\d+$/.test(value);
      if (!isValid) {
        return { invalidFormat: true };
      }
    }
    return null;
  }
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
