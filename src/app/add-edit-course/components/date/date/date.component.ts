/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    DatePipe,
  ],
})
export class DateComponent
  implements AfterContentChecked, ControlValueAccessor, Validator
{
  private onChange: any = () => {};
  private onTouched: any = () => {};
  constructor(
    readonly changeDetectorRef: ChangeDetectorRef,
    private readonly datePipe: DatePipe
  ) {
    this.dateControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  dateControl = new FormControl(0, [
    Validators.required,
    this.formatValidator.bind(this),
  ]);
  validate(): ValidationErrors | null {
    return this.dateControl.errors;
  }
  writeValue(value: any): void {
    this.dateControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  private formatValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    const formattedDate = this.datePipe.transform(value, 'MM/dd/yyy');

    if (formattedDate) {
      const isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(formattedDate);
      if (!isValid) {
        return { invalidFormat: true };
      }
    }
    return null;
  }
}
